using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class Resume : BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // ID của Resume

        [Required]
        [MaxLength(255)]
        public string Email { get; set; } // Email của người nộp CV

        [Required]
        public Guid UserId { get; set; } // UserId của người nộp CV (ObjectId kiểu GUID)

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } // Trạng thái của Resume (PENDING, REVIEWING, APPROVED, REJECTED)

        [Required]
        public Guid CompanyId { get; set; } // ID của công ty

        [Required]
        public Guid JobId { get; set; } // ID của công việc

        // Liên kết với bảng Company (navigation property)
        [ForeignKey("CompanyId")]
        public Company.Company Company { get; set; }

        // Liên kết với bảng Job (navigation property)
        [ForeignKey("JobId")]
        public Job.Job Job { get; set; }
        public User.User User { get; set; }


        // URL file đính kèm
        [MaxLength(500)]
        public string FileUrl { get; set; } // File upload lưu link

        // Lịch sử thay đổi trạng thái
        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();

        public Resume()
        {
            History = new List<ResumeHistory>();
        }
    }



   


}
