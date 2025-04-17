using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.ActivityLog
{
    public class ActivityLogResponse : BaseReponseEntity
    {
        public Guid Id { get; set; }

        public Guid? UserId { get; set; }
        public string? UserName { get; set; }

        public string Action { get; set; }
        public string? Description { get; set; }

        public string? TargetType { get; set; }
        public Guid? TargetId { get; set; }
    }
}
