using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.Company;

namespace TuyenDungAPI.Model.Job
{
    public class Job
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Skills { get; set; } = string.Empty; // 🔥 Chứa nhiều skill dạng "C#, .NET, SQL"

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal Salary { get; set; } // 💰 Lương (nếu có khoảng thì có thể thêm SalaryMin, SalaryMax)

        [Required]
        public int Quantity { get; set; } // Số lượng tuyển dụng

        [Required, MaxLength(50)]
        public string Level { get; set; } = "Intern"; // INTERN / FRESHER / JUNIOR / SENIOR
        [Required]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty; // 🔥 Markdown

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } // 🔚 Có thể để null nếu không có hạn
        public ICollection<CompanyJobs> CompanyJob { get; set; } = new List<CompanyJobs>();

    }
}
