﻿using System;
using TuyenDungAPI.Model.ModelBase;
namespace TuyenDungAPI.Model.User
{
    public class UserResponse: BaseReponseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

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
            CreatedBy = user.CreatedBy;
            UpdatedAt = user.UpdatedAt;
            UpdatedBy = user.UpdatedBy;
            IsDeleted = user.IsDeleted;
            DeletedBy = user.DeletedBy;
            IsActive = user.IsActive;
        }
    }

    // Thêm vào Model/User/UserResponse.cs
    public class DeleteUserResult : BaseEntity
    {
        public Guid UserId { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
    }

    public class DeleteUsersResponse : BaseEntity
    {
        public int TotalRequested { get; set; }
        public int DeletedCount { get; set; }
        public int NotFoundCount { get; set; }
        public List<DeleteUserResult> DeleteResults { get; set; } = new List<DeleteUserResult>();
    }

}
