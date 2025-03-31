using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.User;

namespace TuyenDungAPI.Model.Authentication
{
    public class OtpVerification
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string OtpCode { get; set; } = string.Empty;

        [Required]
        public DateTime OtpExpiry { get; set; }

        // ✅ Khóa ngoại liên kết với User
        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User.User User { get; set; }
    }
}
