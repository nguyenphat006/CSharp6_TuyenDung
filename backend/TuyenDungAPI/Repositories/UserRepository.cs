using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Data;
using TuyenDungAPI.Models;
using TuyenDungAPI.Models.DTOs;

namespace TuyenDungAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _context.Users
                .Include(u => u.Company)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.Company)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);
        }

        public async Task<User?> GetUserByRefreshTokenAsync(string refreshToken)
        {
            return await _context.Users
                .Include(u => u.Company)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken && !u.IsDeleted);
        }

        public async Task<IEnumerable<User>> GetUsersAsync(UserQueryDTO query)
        {
            var users = _context.Users
                .Include(u => u.Company)
                .Include(u => u.Role)
                .Where(u => !u.IsDeleted);

            if (!string.IsNullOrEmpty(query.RoleId))
            {
                users = users.Where(u => u.RoleId == query.RoleId);
            }

            if (!string.IsNullOrEmpty(query.CompanyId))
            {
                users = users.Where(u => u.CompanyId == query.CompanyId);
            }

            return await users.ToListAsync();
        }

        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
} 