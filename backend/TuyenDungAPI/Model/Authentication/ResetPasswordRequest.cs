using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Authentication
{
    public class ResetPasswordRequest
    {
        [EmailAddress]
        [Required (ErrorMessage = "Email không được để trống!")]
        [DefaultValue("nguyendangphat1312@gmail.com")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Mật khẩu không được để trống!")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự!")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$",
        ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt!")]
        public string NewPassword { get; set; } = string.Empty;
    }
}
