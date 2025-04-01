using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.User;

namespace TuyenDungAPI.Service
{

    public class RoleService
    {
        private readonly DataContext _dbContext;
        public RoleService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        // RoleService.cs - Thêm phương thức GetAllRolesAsync
        public async Task<ApiResponse<List<RoleResponse>>> GetAllRolesAsync()
        {
            var roles = await _dbContext.Roles.ToListAsync();

            if (roles == null || !roles.Any())
            {
                return new ApiResponse<List<RoleResponse>>(true, 200, new List<RoleResponse>(), "Không có vai trò nào trong hệ thống!");
            }

            var responseList = roles.Select(r => new RoleResponse(r)).ToList();
            return new ApiResponse<List<RoleResponse>>(true, 200, responseList, "Lấy danh sách vai trò thành công!");
        }

        public async Task<ApiResponse<RoleResponse>> CreateRoleAsync(CreateRoleRequest request)
        {
            // Kiểm tra tên vai trò đã tồn tại chưa
            if (await _dbContext.Roles.AnyAsync(r => r.Name.ToLower() == request.Name.ToLower()))
            {
                return new ApiResponse<RoleResponse>(false, 400, null, "Vai trò này đã tồn tại trong hệ thống!");
            }

            // Tạo vai trò mới
            var role = new Role
            {
                Name = request.Name,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Roles.Add(role);
            await _dbContext.SaveChangesAsync();

            // Tạo response
            var response = new RoleResponse(role);
            return new ApiResponse<RoleResponse>(true, 201, response, "Tạo vai trò thành công!");
        }
    }
}
