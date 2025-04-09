using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeResponse : BaseReponseEntity
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public Guid UserId { get; set; }

        public string Status { get; set; }

        public CompanyResumeResponse Company { get; set; }

        public JobResponse Job { get; set; }

        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();

        public string FileUrl { get; set; } // Trả về URL file đã upload
    }


    public class CompanyResumeResponse
    {
        public Guid Id { get; set; } // ID của công ty
        public string? Name { get; set; } // Tên công ty
    }

    public class JobResponse
    {
        public Guid Id { get; set; } // ID của công việc
        public string? Name { get; set; } // Tên công việc
    }



}
