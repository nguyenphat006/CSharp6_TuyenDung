using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeHistory: BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // ID lịch sử

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } // Trạng thái (PENDING, REVIEWING, APPROVED, REJECTED)

        [Required]
        public Guid ResumeId { get; set; } // Khóa ngoại liên kết với Resume

        // Liên kết với bảng Resume
        [ForeignKey("ResumeId")]
        public Resume Resume { get; set; }
    }

}
