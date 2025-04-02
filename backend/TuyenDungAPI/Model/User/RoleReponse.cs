using Microsoft.AspNetCore.Http.HttpResults;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.User
{
    public class RoleResponse: BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //public DateTime CreatedAt { get; set; }
        //public string CreatedBy { get; set; }
        //public DateTime? UpdatedAt { get; set; }

        //public bool IsActive { get; set; }
        public RoleResponse() { }

        public RoleResponse(Role role)
        {
            Id = role.Id;
            Name = role.Name;
            CreatedAt = role.CreatedAt;
            CreatedBy = role.CreatedBy;
            UpdatedAt = role.UpdatedAt;
            IsActive = role.IsActive;
        }
    }
    public class DeleteRolesResponse : BaseEntity
    {
        public int DeletedCount { get; set; }
        public List<string> DeletedRoleNames { get; set; } = new List<string>();
    }
}
