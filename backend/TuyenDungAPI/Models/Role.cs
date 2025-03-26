using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Role : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public ICollection<Permission> Permissions { get; set; }
        public ICollection<User> Users { get; set; }
    }
} 