using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.Resume
{
    public class ResumeResponse : BaseReponseEntity
    {
        public Guid Id { get; set; } // ID của Resume

        public string? Email { get; set; } // Email của người nộp CV

        public Guid UserId { get; set; } // UserId của người nộp CV (ObjectId kiểu GUID)

        public string? Status { get; set; } // Trạng thái của Resume (PENDING, REVIEWING, APPROVED, REJECTED)

        // Trả về đối tượng Company chứa ID và Name
        public CompanyResponse Company { get; set; }

        // Trả về đối tượng Job chứa ID và Name
        public JobResponse Job { get; set; }

        public List<ResumeHistory> History { get; set; } = new List<ResumeHistory>();
        public List<ResumeFileResponse> Files { get; set; } = new List<ResumeFileResponse>();
    }

    public class CompanyResponse
    {
        public Guid Id { get; set; } // ID của công ty
        public string? Name { get; set; } // Tên công ty
    }

    public class JobResponse
    {
        public Guid Id { get; set; } // ID của công việc
        public string? Name { get; set; } // Tên công việc
    }


    public class ResumeFileResponse
    {
        public Guid Id { get; set; }
        public string? FileUrl { get; set; }
        public string? FileType { get; set; }
        public long FileSize { get; set; }
    }


}
