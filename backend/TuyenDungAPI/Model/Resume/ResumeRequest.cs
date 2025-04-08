using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeRequest: BaseRequestEntity
    {
        public Guid Id { get; set; }
    }
    public class CreateResumeRequest: BaseRequestEntity
    {
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public Guid JobId { get; set; }

        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();
        public List<Guid> Files { get; set; } = new List<Guid>(); // Chứa ID của các file nộp
    }

    public class UpdateResumeRequest: BaseRequestEntity
    {
        [Required]
        public Guid Id { get; set; }

        [MaxLength(255)]
        public string Email { get; set; }

        public string Status { get; set; }

        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();
        public List<Guid> Files { get; set; } = new List<Guid>(); // Chứa ID của các file nộp
    }

}
