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

        //[Required]
        //[MaxLength(50)]
        //public string Status { get; set; }

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

    public class ResumeHistoryRequest
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } // Trạng thái của Resume khi thay đổi

        [Required]
        public DateTime UpdatedAt { get; set; } // Thời gian thay đổi trạng thái

        [Required]
        public ResumeUpdatedByRequest UpdatedBy { get; set; } // Người thay đổi trạng thái, gồm _id và email

        public class ResumeUpdatedByRequest
        {
            [Required]
            public Guid _id { get; set; } // ID của người thay đổi
            [Required]
            [EmailAddress]
            public string Email { get; set; } // Email của người thay đổi
        }
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
