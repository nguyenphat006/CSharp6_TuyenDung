using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Authentication
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Tên không được để trống!")]
        [MaxLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email không được để trống!")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ!")]
        public string Email { get; set; }

        [Range(1, 120, ErrorMessage = "Tuổi phải nằm trong khoảng 1 - 120!")]
        public int Age { get; set; }

        //[Required(ErrorMessage = "Giới tính không được để trống!")]
        //public string Gender { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được để trống!")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự!")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$",
        ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt!")]
        public string Password { get; set; }
    }
}
