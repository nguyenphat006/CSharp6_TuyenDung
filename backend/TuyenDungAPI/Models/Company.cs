using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Company : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        [Required]
        public string Description { get; set; }

        // Navigation property
        public ICollection<User> Users { get; set; }
        public ICollection<Job> Jobs { get; set; }
    }
} 