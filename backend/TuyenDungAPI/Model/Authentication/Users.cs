using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Authentication
{
    public class User : BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = "Unknown";
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public string? RefreshToken { get; set; }  // 🌟 Thêm Refresh Token
        public DateTime RefreshTokenExpiry { get; set; } // 🌟 Hạn dùng Refresh Token
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
