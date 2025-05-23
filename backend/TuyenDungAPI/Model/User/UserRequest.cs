﻿using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.User
{
    public class UserRequest: BaseEntity
    {
        public Guid Id { get; set; }
    }
    public class CreateUserRequest : BaseRequestEntity
    {
        [Required(ErrorMessage = "Tên là bắt buộc")]
        [MaxLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email là bắt buộc")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        [MaxLength(255, ErrorMessage = "Email không được vượt quá 255 ký tự")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mật khẩu không được để trống!")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự!")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$",
        ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt!")]
        public string Password { get; set; } = string.Empty;

        public int Age { get; set; }

        public string Gender { get; set; } = "Unknown";

        public string Role { get; set; } = "User";
    }

    public class UpdateUserRequest : BaseRequestEntity
    {
        [Required(ErrorMessage = "ID người dùng là bắt buộc")]
        public Guid Id { get; set; }
        [MaxLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự")]
        public string? Name { get; set; }
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        [MaxLength(255, ErrorMessage = "Email không được vượt quá 255 ký tự")]
        public string? Email { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public string? Role { get; set; }

    }

    // Thêm vào Model/User/UserRequest.cs
    public class DeleteUserRequest
    {
        [Required(ErrorMessage = "Cần phải có ít nhất một ID người dùng")]
        public List<Guid> UserIds { get; set; } = new List<Guid>();
    }

    public class ResetPasswordUserRequest
    {
        [Required]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword", ErrorMessage = "Mật khẩu xác nhận không khớp")]
        public string ConfirmPassword { get; set; }
    }

    public class ChangePasswordUserRequest
    {
        [Required]
        [MaxLength(100)]
        public string OldPassword { get; set; }  // Mật khẩu cũ

        [Required]
        [MaxLength(100)]
        public string NewPassword { get; set; }  // Mật khẩu mới
    }


}
