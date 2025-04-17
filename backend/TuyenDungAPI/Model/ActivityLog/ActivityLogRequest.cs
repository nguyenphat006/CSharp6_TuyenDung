using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.ActivityLog
{
    public class ActivityLogQueryRequest : BaseRequestEntity
    {
        public Guid? UserId { get; set; } // Lọc theo người thực hiện
        public string? Action { get; set; } // Lọc theo hành động (ex: CREATE_JOB)
        public string? TargetType { get; set; } // Lọc theo đối tượng bị tác động
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
