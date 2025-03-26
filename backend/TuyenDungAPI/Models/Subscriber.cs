using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Subscriber
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Skill { get; set; }
    }
} 