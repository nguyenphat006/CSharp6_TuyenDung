using System.ComponentModel.DataAnnotations;
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
        public string Status { get; set; } // Trạng thái của Resume: PENDING, REVIEWING, APPROVED, REJECTED

        [Required]
        public Guid CompanyId { get; set; } // ID của công ty

        [Required]
        public Guid JobId { get; set; } // ID của công việc

        // Lịch sử trạng thái của Resume
        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();

        // Liên kết với bảng ResumeFile (nếu có nhiều file liên quan)
        public List<ResumeFile> Files { get; set; } = new List<ResumeFile>();

        public Resume()
        {
            History = new List<ResumeHistory>();
            Files = new List<ResumeFile>();
        }
    }


    public class ResumeHistory
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } // Trạng thái của Resume khi thay đổi

        [Required]
        public DateTime UpdatedAt { get; set; } // Thời gian thay đổi trạng thái

        [Required]
        public ResumeUpdatedBy UpdatedBy { get; set; } // Người thay đổi trạng thái, gồm _id và email

        public class ResumeUpdatedBy
        {
            [Required]
            public Guid _id { get; set; } // ID của người thay đổi
            [Required]
            [EmailAddress]
            public string Email { get; set; } // Email của người thay đổi
        }
    }

}
