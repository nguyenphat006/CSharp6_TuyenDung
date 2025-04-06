using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Job
{
    public class Job : BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid CompanyId { get; set; } // 🔥 Thêm CompanyId

        [ForeignKey("CompanyId")]
        public Company.Company Company { get; set; } // 🔥 Navigation Property                                                                   

        [Required, MaxLength(255)]      
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Skills { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal Salary { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required, MaxLength(50)]
        public string Level { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        // 👋 Không cần lưu CompanyName riêng nếu có Navigation (hoặc để nếu cần display nhanh)
    }

}
