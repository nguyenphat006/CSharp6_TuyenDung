namespace TuyenDungAPI.Model.ModelBase
{
    public abstract class BaseEntity
    {
        public Guid? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;

        public Guid? DeletedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
