using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Authentication
{
    public class SendOTPRequest
    {
        [EmailAddress]
        public string? Email { get; set; }
    }
}
