using System;
using TuyenDungAPI.Model.User;
namespace TuyenDungAPI.Model.User
{
    public class GetUserReponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public GetUserResponse() { }

        public GetUserResponse(Authentication.User user)
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
