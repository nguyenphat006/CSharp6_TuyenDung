namespace TuyenDungAPI.Model.User
{
    public class RoleResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public RoleResponse() { }

        public RoleResponse(Role role)
        {
            Id = role.Id;
            Name = role.Name;
            CreatedAt = role.CreatedAt;
            UpdatedAt = role.UpdatedAt;
        }
    }
    public class DeleteRolesResponse
    {
        public int DeletedCount { get; set; }
        public List<string> DeletedRoleNames { get; set; } = new List<string>();
    }
}
