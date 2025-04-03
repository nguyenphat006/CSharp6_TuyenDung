using Microsoft.AspNetCore.Http.HttpResults;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Model.User
{
    public class RoleResponse: BaseReponseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public RoleResponse() { }

        public RoleResponse(Role role)
        {
            Id = role.Id;
            Name = role.Name;
            CreatedAt = role.CreatedAt;
            CreatedBy = role.CreatedBy;
            UpdatedAt = role.UpdatedAt;
            UpdatedBy = role.UpdatedBy;
            IsDeleted = role.IsDeleted;
            DeletedBy = role.DeletedBy;
            IsActive = role.IsActive;
        }
    }
    public class DeleteRolesResponse : BaseEntity
    {
        public int DeletedCount { get; set; }
        public List<string> DeletedRoleNames { get; set; } = new List<string>();
    }
}
