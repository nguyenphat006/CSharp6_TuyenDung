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
        // Email của người nộp CV, sẽ lấy từ token khi gửi yêu cầu
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        // UserId sẽ lấy từ token
        //[Required]
        //public Guid UserId { get; set; }

        // ID công ty, lấy từ frontend
        [Required]
        public Guid CompanyId { get; set; }

        // ID công việc (Job), lấy từ frontend
        [Required]
        public Guid JobId { get; set; }

        // URL file đính kèm (FileUrl), lấy từ frontend
        [Required]
        [MaxLength(500)]
        public string FileUrl { get; set; }

        // Lịch sử thay đổi trạng thái, mặc định khi tạo sẽ có trạng thái PENDING
        //public List<ResumeHistoryRequest> History { get; set; } = new List<ResumeHistoryRequest>();
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



    public class UpdateResumeRequest : BaseRequestEntity
    {
        [Required]
        public Guid Id { get; set; }

        [MaxLength(255)]
        public string Email { get; set; }

        public string Status { get; set; }

        [MaxLength(500)]
        public string FileUrl { get; set; } // Cho phép update lại file mới nếu cần

        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();
    }


   

    public class ResumeQueryParameters
    {
        public string? Email { get; set; } // Lọc theo Email
        public string? Status { get; set; } // Lọc theo Status
        public Guid? CompanyId { get; set; } // Lọc theo CompanyId
        public Guid? JobId { get; set; } // Lọc theo JobId
        public int PageNumber { get; set; } = 1; // Số trang (default là 1)
        public int PageSize { get; set; } = 10; // Số bản ghi mỗi trang (default là 10)
    }

}
