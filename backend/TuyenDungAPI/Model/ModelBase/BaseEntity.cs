namespace TuyenDungAPI.Model.ModelBase
{
    public abstract class BaseEntity
    {
        public string? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;

        public string? DeletedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
    public abstract class BaseRequestEntity
    {
        public bool IsActive { get; set; } = true;
    }
}
