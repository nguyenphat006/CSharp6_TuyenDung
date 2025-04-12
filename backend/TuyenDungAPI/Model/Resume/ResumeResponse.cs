using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeResponse : BaseReponseEntity
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public UserResponse User { get; set; }
        public string Status { get; set; }
        public CompanyResumeResponse Company { get; set; }
        public JobResumeResponse Job { get; set; }
        public List<ResumeHistoryResponse> History { get; set; } = new();
        public string FileUrl { get; set; }
    }

    public class UserResponse
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
    }

   public class CompanyResumeResponse
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
    }

    public class JobResumeResponse
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public decimal Salary { get; set; }
    }

    public class ResumeHistoryResponse
    {
        public string Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        public ResumeHistoryResponse(ResumeHistory history)
        {
            Status = history.Status;
            CreatedBy = history.CreatedBy ?? "System";
            CreatedAt = history.CreatedAt;
        }
    }




}
