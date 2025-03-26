using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public class Resume : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public ResumeStatus Status { get; set; }

        public ICollection<ResumeHistory> History { get; set; }
    }

    public enum ResumeStatus
    {
        PENDING,
        REVIEWING,
        APPROVED,
        REJECTED
    }

    public class ResumeHistory
    {
        [Key]
        public string Id { get; set; }
        public string ResumeId { get; set; }
        public Resume Resume { get; set; }
        public ResumeStatus Status { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UpdatedById { get; set; }
        public string UpdatedByEmail { get; set; }
    }
} 