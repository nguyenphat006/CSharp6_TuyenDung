using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.User
{
    public class CreateRoleRequest: BaseEntity
    {
        [Required(ErrorMessage = "Tên vai trò là bắt buộc")]
        [MaxLength(50, ErrorMessage = "Tên vai trò không được vượt quá 50 ký tự")]
        public string Name { get; set; } = string.Empty;
    }
    public class UpdateRoleRequest : BaseEntity
    {
        [Required(ErrorMessage = "Tên vai trò là bắt buộc")]
        [MaxLength(100, ErrorMessage = "Tên vai trò không được vượt quá 100 ký tự")]
        public string Name { get; set; } = string.Empty;
    }
    public class DeleteRolesRequest : BaseEntity
    {
        [Required(ErrorMessage = "Danh sách ID vai trò là bắt buộc")]
        public List<Guid> RoleIds { get; set; } = new List<Guid>();
    }
}
