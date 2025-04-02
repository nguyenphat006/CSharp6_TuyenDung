using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ModelBase;
using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model.User;
namespace TuyenDungAPI.Service
{
    public class UserService
    {
        private readonly DataContext _dbContext;

        public UserService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ApiResponse<List<UserResponse>>> GetAllUsersAsync()
        {
            var users = await _dbContext.Users
                .Where(u => !u.IsDeleted) // Lọc chỉ lấy người dùng chưa bị xóa
                .ToListAsync();

            if (!users.Any())
            {
                return new ApiResponse<List<UserResponse>>(true, 200, new List<UserResponse>(), "Không có người dùng nào trong hệ thống!");
            }

            var response = users.Select(u => new UserResponse(u)).ToList();

            return new ApiResponse<List<UserResponse>>(true, 200, response, "Lấy danh sách người dùng thành công");
        }


        public async Task<ApiResponse<UserResponse>> GetUserByIdAsync(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
                return new ApiResponse<UserResponse>(false, 404, null, "Không tìm thấy người dùng");

            var response = new UserResponse(user);
            return new ApiResponse<UserResponse>(true, 200, response, "Lấy thông tin người dùng thành công");
        }

        public async Task<ApiResponse<UserResponse>> CreateUserAsync(CreateUserRequest request)
        {
            // Kiểm tra email đã tồn tại chưa
            if (await _dbContext.Users.AnyAsync(u => u.Email == request.Email))
            {
                return new ApiResponse<UserResponse>(false, 400, null, "Email đã tồn tại trong hệ thống!");
            }

            // Mã hóa mật khẩu
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Tạo user mới
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Age = request.Age,
                Gender = request.Gender,
                PasswordHash = passwordHash,
                IsActive = request.IsActive, // Mặc định là active nếu không truyền vào
                CreatedAt = DateTime.UtcNow
            };

            // Thêm user vào DB
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Tìm kiếm Role trong DB dựa trên role được yêu cầu
            var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Name == request.Role);

            // Nếu không tồn tại, tạo role mới
            if (role == null)
            {
                role = new Role { Name = request.Role };
                _dbContext.Roles.Add(role);
                await _dbContext.SaveChangesAsync();
            }

            // Tạo UserRole để liên kết User với Role
            var userRoleAssignment = new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id
            };

            _dbContext.UserRoles.Add(userRoleAssignment);
            await _dbContext.SaveChangesAsync();

            // Tạo response
            var response = new UserResponse(user);
            return new ApiResponse<UserResponse>(true, 201, response, "Tạo người dùng thành công!");
        }


        public async Task<ApiResponse<UserResponse>> UpdateUserAsync(UpdateUserRequest request)
        {
            // Tìm user theo ID
            var user = await _dbContext.Users.FindAsync(request.Id);
            if (user == null)
            {
                return new ApiResponse<UserResponse>(false, 404, null, "Không tìm thấy người dùng!");
            }

            // Kiểm tra email đã tồn tại chưa (nếu email thay đổi)
            if (!string.IsNullOrEmpty(request.Email) && request.Email != user.Email)
            {
                if (await _dbContext.Users.AnyAsync(u => u.Email == request.Email))
                {
                    return new ApiResponse<UserResponse>(false, 400, null, "Email đã tồn tại trong hệ thống!");
                }
                user.Email = request.Email;
            }

            // Cập nhật thông tin người dùng
            if (!string.IsNullOrEmpty(request.Name))
                user.Name = request.Name;

            if (request.Age.HasValue)
                user.Age = request.Age.Value;

            if (!string.IsNullOrEmpty(request.Gender))
                user.Gender = request.Gender;

            if (request.IsActive)
                user.IsActive = request.IsActive;

            // Cập nhật mật khẩu nếu có
            if (!string.IsNullOrEmpty(request.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Kiểm tra role nếu có thay đổi
            if (!string.IsNullOrEmpty(request.Role))
            {
                // Lấy role mới
                var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Name == request.Role);

                // Nếu không tồn tại, tạo mới
                if (role == null)
                {
                    role = new Role { Name = request.Role };
                    _dbContext.Roles.Add(role);
                    await _dbContext.SaveChangesAsync();
                }

                // Xóa các vai trò cũ của user
                var existingRoles = await _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToListAsync();
                _dbContext.UserRoles.RemoveRange(existingRoles);

                // Thêm role mới cho user
                var userRoleAssignment = new UserRole
                {
                    UserId = user.Id,
                    RoleId = role.Id
                };

                _dbContext.UserRoles.Add(userRoleAssignment);
            }

            // Cập nhật thời gian sửa đổi
            user.UpdatedAt = DateTime.UtcNow;

            // Lưu thay đổi vào database
            await _dbContext.SaveChangesAsync();

            // Tạo response
            var response = new UserResponse(user);
            return new ApiResponse<UserResponse>(true, 200, response, "Cập nhật thông tin người dùng thành công!");
        }



        public async Task<ApiResponse<DeleteUsersResponse>> DeleteUsersAsync(List<Guid> userIds)
        {
            if (userIds == null || !userIds.Any())
            {
                return new ApiResponse<DeleteUsersResponse>(false, 400, null, "Danh sách ID người dùng không được để trống!");
            }

            var deletedCount = 0;
            var notFoundIds = new List<Guid>();
            var deleteResults = new List<DeleteUserResult>();

            // Lấy danh sách người dùng hợp lệ (chưa bị xóa trước đó)
            var usersToDelete = await _dbContext.Users
                .Where(u => userIds.Contains(u.Id) && !u.IsDeleted)
                .ToListAsync();

            // Duyệt qua từng ID được yêu cầu
            foreach (var id in userIds)
            {
                var user = usersToDelete.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    notFoundIds.Add(id);
                    deleteResults.Add(new DeleteUserResult
                    {
                        UserId = id,
                        Success = false,
                        Message = "Không tìm thấy người dùng hoặc đã bị xóa"
                    });
                    continue;
                }

                // Cập nhật trạng thái IsDeleted thay vì xóa khỏi DB
                user.IsDeleted = true;
                deletedCount++;
                deleteResults.Add(new DeleteUserResult
                {
                    UserId = id,
                    Success = true,
                    Message = "Đã vô hiệu hóa thành công",
                    UserName = user.Name,
                    UserEmail = user.Email
                });
            }

            // Lưu thay đổi vào database
            await _dbContext.SaveChangesAsync();

            var response = new DeleteUsersResponse
            {
                TotalRequested = userIds.Count,
                DeletedCount = deletedCount,
                NotFoundCount = notFoundIds.Count,
                DeleteResults = deleteResults
            };

            string message = $"Đã vô hiệu hóa {deletedCount}/{userIds.Count} người dùng";
            if (notFoundIds.Any())
            {
                message += $", không tìm thấy {notFoundIds.Count} người dùng";
            }

            return new ApiResponse<DeleteUsersResponse>(
                deletedCount > 0,
                deletedCount > 0 ? 200 : 404,
                response,
                message);
        }

    }
}

