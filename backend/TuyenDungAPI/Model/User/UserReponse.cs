using System;
namespace TuyenDungAPI.Model.User
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public UserResponse() { }

        public UserResponse(User user)
        {
            Id = user.Id;
            Name = user.Name;                                                                                   
            Email = user.Email;
            Age = user.Age;
            Gender = user.Gender;
            Role = user.Role;
            CreatedAt = user.CreatedAt;
            UpdatedAt = user.UpdatedAt;
        }
    }

}
