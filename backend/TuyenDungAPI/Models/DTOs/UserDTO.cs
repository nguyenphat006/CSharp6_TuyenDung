using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models.DTOs
{
    public class CreateUserDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        public string? CompanyId { get; set; }
        public string? RoleId { get; set; }
    }

    public class UpdateUserDTO
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? Password { get; set; }

        public int? Age { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        public string? CompanyId { get; set; }
    }

    public class UserResponseDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string? CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class UserQueryDTO
    {
        public string? RoleId { get; set; }
        public string? CompanyId { get; set; }
    }
} 