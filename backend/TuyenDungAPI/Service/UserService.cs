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
            var users = await _dbContext.Users.ToListAsync();

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
                Role = request.Role,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Sử dụng UserResponse để tạo response
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

            if (!string.IsNullOrEmpty(request.Role))
                user.Role = request.Role;

            // Cập nhật mật khẩu nếu có
            if (!string.IsNullOrEmpty(request.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Cập nhật thời gian
            user.UpdatedAt = DateTime.UtcNow;

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

            foreach (var id in userIds)
            {
                var user = await _dbContext.Users.FindAsync(id);
                if (user == null)
                {
                    notFoundIds.Add(id);
                    deleteResults.Add(new DeleteUserResult
                    {
                        UserId = id,
                        Success = false,
                        Message = "Không tìm thấy người dùng"
                    });
                    continue;
                }

                _dbContext.Users.Remove(user);
                deletedCount++;
                deleteResults.Add(new DeleteUserResult
                {
                    UserId = id,
                    Success = true,
                    Message = "Xóa thành công",
                    UserName = user.Name,
                    UserEmail = user.Email
                });
            }

            await _dbContext.SaveChangesAsync();

            var response = new DeleteUsersResponse
            {
                TotalRequested = userIds.Count,
                DeletedCount = deletedCount,
                NotFoundCount = notFoundIds.Count,
                DeleteResults = deleteResults
            };

            string message = $"Đã xóa {deletedCount}/{userIds.Count} người dùng";
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

