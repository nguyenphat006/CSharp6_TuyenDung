using TuyenDungAPI.Models;
using TuyenDungAPI.Models.DTOs;

namespace TuyenDungAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(string id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByRefreshTokenAsync(string refreshToken);
        Task<IEnumerable<User>> GetUsersAsync(UserQueryDTO query);
        Task<User> AddUserAsync(User user);
        Task UpdateUserAsync(User user);
    }
} 