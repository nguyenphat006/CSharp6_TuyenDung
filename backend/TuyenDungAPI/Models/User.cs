using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class User : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        public string? CompanyId { get; set; }
        public Company? Company { get; set; }

        [Required]
        public string RoleId { get; set; }
        public Role Role { get; set; }

        public string? RefreshToken { get; set; }
    }
} 