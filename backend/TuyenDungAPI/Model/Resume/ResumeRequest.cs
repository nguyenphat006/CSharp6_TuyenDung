using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeRequest: BaseRequestEntity
    {
        public Guid Id { get; set; }
    }
    public class CreateResumeRequest
    {

        // ID công ty, lấy từ frontend
        [Required]
        public Guid CompanyId { get; set; }

        // ID công việc (Job), lấy từ frontend
        [Required]
        public Guid JobId { get; set; }

        [Required]
        public IFormFile File { get; set; }  // ⚠️ Thay vì dùng FileUrl
    }

    public class ResumeHistoryRequest
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; }  // Trạng thái của Resume khi tạo (ví dụ: "PENDING")

        [Required]
        public DateTime UpdatedAt { get; set; }  // Thời gian cập nhật trạng thái

        public ResumeHistoryRequest()
        {
            Status = "PENDING"; // Mặc định trạng thái là PENDING khi tạo Resume
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public class UpdateStatusResumeRequest
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; }
    }

    public class DeleteResumeRequest
    {
        [Required]
        public List<Guid> ResumeIds { get; set; } = new();
    }

    public class ResumeQueryParameters
    {
        public string? Email { get; set; }  // Lọc theo Email
        public string? Status { get; set; }  // Lọc theo Status
        public Guid? CompanyId { get; set; }  // Lọc theo CompanyId
        public Guid? JobId { get; set; }  // Lọc theo JobId
        public int PageNumber { get; set; } = 1;  // Trang hiện tại (mặc định 1)
        public int PageSize { get; set; } = 10;   // Kích thước trang (mặc định 10)
    }

 

}
