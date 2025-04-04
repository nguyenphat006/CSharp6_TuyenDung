using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Company
{
    public class CompanyRequest: BaseRequestEntity
    {
        public Guid Id { get; set; }
    }
    public class CreateCompanyRequest : BaseRequestEntity
    {
        [DefaultValue("11111111-1111-1111-1111-111111111111")]
        public Guid Id { get; set; }
        [Required, MaxLength(255)]
        [DefaultValue("Tiktok")]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        [DefaultValue("Onsite")]
        public string CompanyModel { get; set; } = string.Empty; // Mô hình công ty

        [Required, MaxLength(100)]
        [DefaultValue("Sản xuất phần mềm")]
        public string Industry { get; set; } = string.Empty; // Lĩnh vực công ty

        [Required, MaxLength(50)]
        [DefaultValue("200+")]
        public string CompanySize { get; set; } = string.Empty; // Quy mô công ty

        [Required, MaxLength(500)]
        [DefaultValue("Hồ Chí Minh")]
        public string Address { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty; // Markdown nội dung mô tả

        [Required, MaxLength(100)]
        [DefaultValue("Thứ 2 - Thứ 6")]
        public string WorkingTime { get; set; } = string.Empty; // Ví dụ: "Thứ 2 - Thứ 6, 9h - 18h"
    }

    public class UpdateCompanyRequest : BaseRequestEntity
    {
        [DefaultValue("11111111-1111-1111-1111-111111111111")]
        public Guid Id { get; set; }
        [Required, MaxLength(255)]
        [DefaultValue("Tiktok")]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        [DefaultValue("Onsite")]
        public string CompanyModel { get; set; } = string.Empty; // Mô hình công ty

        [Required, MaxLength(100)]
        [DefaultValue("Sản xuất phần mềm")]
        public string Industry { get; set; } = string.Empty; // Lĩnh vực công ty

        [Required, MaxLength(50)]
        [DefaultValue("200+")]
        public string CompanySize { get; set; } = string.Empty; // Quy mô công ty

        [Required, MaxLength(500)]
        [DefaultValue("Hồ Chí Minh")]
        public string Address { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty; // Markdown nội dung mô tả

        [Required, MaxLength(100)]
        [DefaultValue("Thứ 2 - Thứ 6")]
        public string WorkingTime { get; set; } = string.Empty; // Ví dụ: "Thứ 2 - Thứ 6, 9h - 18h"
    }

    public class DeleteCompanyRequest
    {
        [Required(ErrorMessage = "Cần phải có ít nhất một ID công ty")]
        public List<Guid> Companys { get; set; } = new List<Guid>();
    }
}
