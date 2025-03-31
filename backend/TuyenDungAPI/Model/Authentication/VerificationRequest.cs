using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Authentication
{
    public class SendOtpRequest
    {
        [EmailAddress]
        [DefaultValue("nguyendangphat1312@gmail.com")]
        public string? Email { get; set; } = string.Empty;

    }
    public class VerificationRequest
    {
        [EmailAddress]
        [DefaultValue("nguyendangphat1312@gmail.com")]
        public string? Email { get; set; } = string.Empty;
        public string? Otp { get; set; }

    }
}
