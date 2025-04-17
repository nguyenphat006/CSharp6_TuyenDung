using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Model.Company
{
    public class CompanyJobs
    {
        // 🔗 Liên kết với bảng Company
        [Required]
        public Guid CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        // 🔗 Liên kết với bảng Job
        [Required]
        public Guid JobId { get; set; }

        [ForeignKey("JobId")]
        public Job.Job Job { get; set; }
    }
}
