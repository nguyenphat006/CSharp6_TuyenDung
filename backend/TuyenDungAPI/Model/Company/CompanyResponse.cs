using Microsoft.AspNetCore.Http.HttpResults;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Company
{
    public class CompanyResponse : BaseReponseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CompanyModel { get; set; } = string.Empty;
        public string Industry { get; set; } = string.Empty;
        public string CompanySize { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WorkingTime { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }

        // 👉 Constructor từ entity
        public CompanyResponse(Company company)
        {
            Id = company.Id;
            Name = company.Name;
            CompanyModel = company.CompanyModel;
            Industry = company.Industry;
            CompanySize = company.CompanySize;
            Address = company.Address;
            Description = company.Description;
            WorkingTime = company.WorkingTime;
            LogoUrl = company.LogoUrl;

            CreatedAt = company.CreatedAt;
            CreatedBy = company.CreatedBy;
            UpdatedAt = company.UpdatedAt;
            UpdatedBy = company.UpdatedBy;
            IsDeleted = company.IsDeleted;
            DeletedBy = company.DeletedBy;
            IsActive = company.IsActive;
        }
    }

    public class DeleteComnpanysResponse : BaseEntity
    {
        public int DeletedCount { get; set; }
        public List<string> DeletedCompanyNames { get; set; } = new List<string>();
    }
}
