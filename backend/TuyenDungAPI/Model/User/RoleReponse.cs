namespace TuyenDungAPI.Model.User
{
    public class RoleResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
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
}
