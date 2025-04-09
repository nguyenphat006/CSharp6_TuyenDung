using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeFile : BaseEntity
    {
        [Key]
        public Guid Id { get; set; } // ID của file

        [Required]
        public string? FileUrl { get; set; } // URL của file đã tải lên

        [Required]
        public string? FileType { get; set; } // Loại file (PDF, DOCX, v.v.)

        [Required]
        public long FileSize { get; set; } // Kích thước file (Bytes)

        [Required]
        public Guid ResumeId { get; set; } // Liên kết tới Resume

        // Liên kết với bảng Resume (1-n relationship)
        public Resume Resume { get; set; }
    }

}
