using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.User
{
    public class CreateRoleRequest
    {
        [Required(ErrorMessage = "Tên vai trò là bắt buộc")]
        [MaxLength(50, ErrorMessage = "Tên vai trò không được vượt quá 50 ký tự")]
        public string Name { get; set; } = string.Empty;
    }
}
