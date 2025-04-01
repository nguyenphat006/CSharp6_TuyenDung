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

        public async Task<ApiResponse<RoleResponse>> UpdateRoleAsync(Guid id, UpdateRoleRequest request)
        {
            // Tìm vai trò cần cập nhật
            var role = await _dbContext.Roles.FindAsync(id);
            if (role == null)
            {
                return new ApiResponse<RoleResponse>(false, 404, null, "Không tìm thấy vai trò với ID cung cấp!");
            }

            // Kiểm tra nếu tên mới đã tồn tại và không phải của vai trò hiện tại
            if (await _dbContext.Roles.AnyAsync(r => r.Name.ToLower() == request.Name.ToLower() && r.Id != id))
            {
                return new ApiResponse<RoleResponse>(false, 400, null, "Tên vai trò này đã tồn tại trong hệ thống!");
            }

            // Cập nhật thông tin vai trò
            role.Name = request.Name;
            role.UpdatedAt = DateTime.UtcNow;

            // Lưu thay đổi
            _dbContext.Roles.Update(role);
            await _dbContext.SaveChangesAsync();

            // Tạo response
            var response = new RoleResponse(role);
            return new ApiResponse<RoleResponse>(true, 200, response, "Cập nhật vai trò thành công!");
        }

        public async Task<ApiResponse<DeleteRolesResponse>> DeleteRolesAsync(DeleteRolesRequest request)
        {
            // Kiểm tra nếu danh sách rỗng
            if (request.RoleIds == null || !request.RoleIds.Any())
            {
                return new ApiResponse<DeleteRolesResponse>(false, 400, null, "Không có vai trò nào được chỉ định để xóa!");
            }

            // Tìm các vai trò cần xóa
            var rolesToDelete = await _dbContext.Roles
                .Where(r => request.RoleIds.Contains(r.Id))
                .ToListAsync();

            if (!rolesToDelete.Any())
            {
                return new ApiResponse<DeleteRolesResponse>(false, 404, null, "Không tìm thấy vai trò nào với ID đã cung cấp!");
            }

            // Kiểm tra nếu có vai trò đang được sử dụng bởi người dùng
            var roleIdsInUse = await _dbContext.UserRoles
                .Where(ur => request.RoleIds.Contains(ur.RoleId))
                .Select(ur => ur.RoleId)
                .Distinct()
                .ToListAsync();

            if (roleIdsInUse.Any())
            {
                // Lấy tên của các vai trò đang được sử dụng
                var roleNamesInUse = await _dbContext.Roles
                    .Where(r => roleIdsInUse.Contains(r.Id))
                    .Select(r => r.Name)
                    .ToListAsync();

                return new ApiResponse<DeleteRolesResponse>(false, 400, null,
                    $"Không thể xóa vai trò đang được sử dụng: {string.Join(", ", roleNamesInUse)}");
            }

            // Xóa các vai trò
            _dbContext.Roles.RemoveRange(rolesToDelete);
            await _dbContext.SaveChangesAsync();

            // Tạo response
            var deletedRoleNames = rolesToDelete.Select(r => r.Name).ToList();
            var response = new DeleteRolesResponse
            {
                DeletedCount = rolesToDelete.Count,
                DeletedRoleNames = deletedRoleNames
            };

            var message = rolesToDelete.Count == 1
                ? $"Đã xóa vai trò '{deletedRoleNames[0]}' thành công!"
                : $"Đã xóa {rolesToDelete.Count} vai trò thành công!";

            return new ApiResponse<DeleteRolesResponse>(true, 200, response, message);
        }
    }
}
