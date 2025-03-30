using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Authentication
{
    public class LoginRequest
    {
        [Required]
        [DefaultValue("nguyendangphat1312@gmail.com")]
        public string Email { get; set; } = string.Empty;
        [Required]
        [DefaultValue("Kakapro@123")]
        public string Password { get; set; } = string.Empty;
    }
}
