using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.ActivityLog
{
    public class ActivityLog: BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid? UserId { get; set; }            // Ai thực hiện
        public string? UserName { get; set; }        // Tên người thao tác (optional)

        [Required]
        public string Action { get; set; }           // Tên hành động (ex: CREATE_JOB)

        public string? Description { get; set; }     // Mô tả hành động

        public string? TargetType { get; set; }      // Đối tượng bị tác động (ex: Job, Resume)
        public Guid? TargetId { get; set; }          // ID của đối tượng
    }
}
