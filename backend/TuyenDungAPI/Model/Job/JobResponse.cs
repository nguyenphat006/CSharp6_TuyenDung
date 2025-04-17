using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Job
{
    public class JobResponse : BaseReponseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Skills { get; set; } = string.Empty;

        public List<string> SkillsList =>
            string.IsNullOrWhiteSpace(Skills)
            ? new List<string>()
            : Skills.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries).ToList();

        public string Location { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public int Quantity { get; set; }
        public string Level { get; set; } = "Intern";

        public Guid CompanyId { get; set; } // ✅ Thêm mới

        public string? CompanyName { get; set; } = string.Empty; // ✅ Optional (nếu Include Company trong query)

        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Constructor khởi tạo từ entity Job
        public JobResponse(Job job)
        {
            Id = job.Id;
            Name = job.Name;
            Skills = job.Skills;
            Location = job.Location;
            Salary = job.Salary;
            Quantity = job.Quantity;
            Level = job.Level;
            Description = job.Description;
            StartDate = job.StartDate;
            EndDate = job.EndDate;
            CompanyId = job.CompanyId;

            CompanyName = job.Company?.Name ?? ""; // ✅ Chỉ dùng nếu Include Company

            CreatedAt = job.CreatedAt;
            CreatedBy = job.CreatedBy;
            UpdatedAt = job.UpdatedAt;
            UpdatedBy = job.UpdatedBy;
            IsDeleted = job.IsDeleted;
            DeletedBy = job.DeletedBy;
            IsActive = job.IsActive;
        }
    }
}
