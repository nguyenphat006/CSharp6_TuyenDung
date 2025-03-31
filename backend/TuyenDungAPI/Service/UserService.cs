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
    }
}

