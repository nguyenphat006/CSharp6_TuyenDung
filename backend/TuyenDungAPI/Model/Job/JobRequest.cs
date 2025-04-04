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

        [DefaultValue("11111111-1111-1111-1111-111111111111")]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        [DefaultValue("Lập trình viên .NET")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [DefaultValue(new[] { "C#", ".NET", "SQL" })]
        public List<string> Skills { get; set; } = new();

        [Required]
        [DefaultValue("Hà Nội")]
        public string Location { get; set; } = string.Empty;

        [Required]
        [DefaultValue(1500)]
        public decimal Salary { get; set; }

        [Required]
        [DefaultValue(2)]
        public int Quantity { get; set; }

        [Required, MaxLength(50)]
        [DefaultValue("Junior")]
        public string Level { get; set; } = "Intern";

        [Required]
        [DefaultValue("Công ty ABC")]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [DefaultValue("## Mô tả công việc\n- Làm việc nhóm\n- Học hỏi và phát triển")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [DefaultValue(typeof(DateTime), "2025-04-01")]
        public DateTime StartDate { get; set; }

        [DefaultValue(typeof(DateTime), "2025-06-01")]
        public DateTime? EndDate { get; set; }
    }


    public class UpdateJobRequest : BaseRequestEntity
    {
        public Guid Id { get; set; }
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
        public string CompanyName { get; set; } = string.Empty;

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

}
