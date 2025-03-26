using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Permission : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Path { get; set; }

        [Required]
        public string Method { get; set; }

        [Required]
        public string Description { get; set; }

        public ICollection<Role> Roles { get; set; }
    }
} 