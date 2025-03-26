using System.ComponentModel.DataAnnotations;

namespace TuyenDungAPI.Models
{
    public abstract class BaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        
        public string CreatedById { get; set; }
        public string CreatedByEmail { get; set; }
        
        public string? UpdatedById { get; set; }
        public string? UpdatedByEmail { get; set; }
        
        public string? DeletedById { get; set; }
        public string? DeletedByEmail { get; set; }
    }
} 