using System.ComponentModel.DataAnnotations;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.User
{
    public class Role : BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required, MaxLength(50)]
        public string Name { get; set; } = string.Empty;                
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
