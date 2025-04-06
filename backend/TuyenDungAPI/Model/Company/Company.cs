using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Company
{
    public class Company: BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string CompanyModel { get; set; } = string.Empty; // Mô hình công ty

        [Required, MaxLength(100)]
        public string Industry { get; set; } = string.Empty; // Lĩnh vực công ty

        [Required, MaxLength(50)]
        public string CompanySize { get; set; } = string.Empty; // Quy mô công ty

        [Required, MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty; // Markdown nội dung mô tả

        [Required, MaxLength(100)]
        public string WorkingTime { get; set; } = string.Empty; // Ví dụ: "Thứ 2 - Thứ 6, 9h - 18h"
        [MaxLength(500)]
        public string? LogoUrl { get; set; } // hoặc AvatarUrl / ImageUrl
    }
}
