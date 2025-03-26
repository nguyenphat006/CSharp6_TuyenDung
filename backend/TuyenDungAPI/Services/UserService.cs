using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Data;
using TuyenDungAPI.Models;
using TuyenDungAPI.Models.DTOs;
using TuyenDungAPI.Repositories;

namespace TuyenDungAPI.Services
{
    public interface IUserService
    {
        Task<UserResponseDTO> CreateUserAsync(CreateUserDTO createUserDTO, string currentUserId);
        Task<IEnumerable<UserResponseDTO>> GetUsersAsync(UserQueryDTO query);
        Task<UserResponseDTO?> GetUserByIdAsync(string userId);
        Task<UserResponseDTO> UpdateUserAsync(string userId, UpdateUserDTO updateUserDTO, string currentUserId);
        Task<bool> DeleteUserAsync(string userId, string currentUserId);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppDbContext _context;

        public UserService(IUserRepository userRepository, AppDbContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        public async Task<UserResponseDTO> CreateUserAsync(CreateUserDTO createUserDTO, string currentUserId)
        {
            // Check if email exists
            var existingUser = await _userRepository.GetUserByEmailAsync(createUserDTO.Email);
            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }

            // Hash password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(createUserDTO.Password);

            // Get default role if not specified
            var roleId = createUserDTO.RoleId;
            if (string.IsNullOrEmpty(roleId))
            {
                var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Candidate");
                if (defaultRole == null)
                {
                    throw new Exception("Default role not found");
                }
                roleId = defaultRole.Id;
            }

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Name = createUserDTO.Name,
                Email = createUserDTO.Email,
                PasswordHash = passwordHash,
                Age = createUserDTO.Age,
                Gender = createUserDTO.Gender,
                Address = createUserDTO.Address,
                CompanyId = createUserDTO.CompanyId,
                RoleId = roleId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedById = currentUserId,
                CreatedByEmail = currentUserId // You might want to get the actual email here
            };

            await _userRepository.AddUserAsync(user);
            return await MapToUserResponseDTO(user);
        }

        public async Task<IEnumerable<UserResponseDTO>> GetUsersAsync(UserQueryDTO query)
        {
            var users = await _userRepository.GetUsersAsync(query);
            return await Task.WhenAll(users.Select(MapToUserResponseDTO));
        }

        public async Task<UserResponseDTO?> GetUserByIdAsync(string userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null) return null;
            return await MapToUserResponseDTO(user);
        }

        public async Task<UserResponseDTO> UpdateUserAsync(string userId, UpdateUserDTO updateUserDTO, string currentUserId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Check if user has permission to update
            var currentUser = await _userRepository.GetUserByIdAsync(currentUserId);
            if (currentUser == null)
            {
                throw new Exception("Current user not found");
            }

            var currentUserRole = await _context.Roles.FindAsync(currentUser.RoleId);
            if (currentUserRole == null)
            {
                throw new Exception("Current user role not found");
            }

            if (currentUserRole.Name != "Admin" && currentUserId != userId)
            {
                throw new Exception("You don't have permission to update this user");
            }

            // Update user properties
            if (!string.IsNullOrEmpty(updateUserDTO.Name))
                user.Name = updateUserDTO.Name;
            if (!string.IsNullOrEmpty(updateUserDTO.Email))
                user.Email = updateUserDTO.Email;
            if (!string.IsNullOrEmpty(updateUserDTO.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateUserDTO.Password);
            if (updateUserDTO.Age.HasValue)
                user.Age = updateUserDTO.Age.Value;
            if (!string.IsNullOrEmpty(updateUserDTO.Gender))
                user.Gender = updateUserDTO.Gender;
            if (!string.IsNullOrEmpty(updateUserDTO.Address))
                user.Address = updateUserDTO.Address;
            if (updateUserDTO.CompanyId != null)
                user.CompanyId = updateUserDTO.CompanyId;

            user.UpdatedAt = DateTime.UtcNow;
            user.UpdatedById = currentUserId;
            user.UpdatedByEmail = currentUserId; // You might want to get the actual email here

            await _userRepository.UpdateUserAsync(user);
            return await MapToUserResponseDTO(user);
        }

        public async Task<bool> DeleteUserAsync(string userId, string currentUserId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Check if user has permission to delete
            var currentUser = await _userRepository.GetUserByIdAsync(currentUserId);
            if (currentUser == null)
            {
                throw new Exception("Current user not found");
            }

            var currentUserRole = await _context.Roles.FindAsync(currentUser.RoleId);
            if (currentUserRole == null)
            {
                throw new Exception("Current user role not found");
            }

            if (currentUserRole.Name != "Admin")
            {
                throw new Exception("You don't have permission to delete users");
            }

            user.IsDeleted = true;
            user.DeletedById = currentUserId;
            user.DeletedByEmail = currentUserId; // You might want to get the actual email here

            await _userRepository.UpdateUserAsync(user);
            return true;
        }

        private async Task<UserResponseDTO> MapToUserResponseDTO(User user)
        {
            var company = user.CompanyId != null ? await _context.Companies.FindAsync(user.CompanyId) : null;
            var role = await _context.Roles.FindAsync(user.RoleId);

            return new UserResponseDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                Gender = user.Gender,
                Address = user.Address,
                CompanyId = user.CompanyId,
                CompanyName = company?.Name,
                RoleId = user.RoleId,
                RoleName = role?.Name,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
} 