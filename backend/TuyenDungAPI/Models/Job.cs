using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Job : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public string Skill { get; set; }

        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; }

        [Required]
        public decimal Salary { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public JobLevel Level { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }

    public enum JobLevel
    {
        INTERN,
        FRESHER,
        JUNIOR,
        SENIOR
    }
} 