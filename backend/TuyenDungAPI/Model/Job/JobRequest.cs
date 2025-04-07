using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Job
{
    public class JobRequest: BaseRequestEntity
    {
        public Guid Id { get; set; }
    }
    public class CreateJobRequest : BaseRequestEntity
    {
        [Required]
        public Guid CompanyId { get; set; } // 🔥 FE gửi ID của công ty lên

        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public List<string> Skills { get; set; } = new();

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal Salary { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required, MaxLength(50)]
        public string Level { get; set; } = "Intern";

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }



    public class UpdateJobRequest : BaseRequestEntity
    {
        [Required]
        public Guid CompanyId { get; set; } // 🔥 FE gửi ID của công ty lên
        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;
        [Required]
        //public string Skills { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new(); 
        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal Salary { get; set; }

        [Required]
        public int Quantity { get; set; } 

        [Required, MaxLength(50)]
        public string Level { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty; // 🔥 Markdown

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } // 🔚 Có thể để null nếu không có hạn
    }

    public class DeleteJobRequest
    {
        [Required(ErrorMessage = "Cần phải có ít nhất một ID việc làm")]
        public List<Guid> JobIds { get; set; } = new List<Guid>();
    }

    public class JobQueryParameters
    {
        public string? Keyword { get; set; }
        public string? Level { get; set; }
        public string? Location { get; set; }
        public string? CompanyName { get; set; }
        public decimal? MinSalary { get; set; }
        public decimal? MaxSalary { get; set; }
        public bool? IsActive { get; set; }

        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

}
