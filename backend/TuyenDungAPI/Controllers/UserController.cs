using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TuyenDungAPI.Models.DTOs;
using TuyenDungAPI.Services;

namespace TuyenDungAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO createUserDTO)
        {
            try
            {
                var currentUserId = User.FindFirst("UserId")?.Value;
                if (string.IsNullOrEmpty(currentUserId))
                {
                    return Unauthorized();
                }

                var user = await _userService.CreateUserAsync(createUserDTO, currentUserId);
                return CreatedAtAction(nameof(GetUserById), new { userId = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers([FromQuery] UserQueryDTO query)
        {
            try
            {
                var users = await _userService.GetUsersAsync(query);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }

                // Check if user has permission to view
                var currentUserId = User.FindFirst("UserId")?.Value;
                var currentUserRole = User.FindFirst("Role")?.Value;

                if (currentUserRole != "Admin" && currentUserId != userId)
                {
                    return Forbid();
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UpdateUserDTO updateUserDTO)
        {
            try
            {
                var currentUserId = User.FindFirst("UserId")?.Value;
                if (string.IsNullOrEmpty(currentUserId))
                {
                    return Unauthorized();
                }

                var user = await _userService.UpdateUserAsync(userId, updateUserDTO, currentUserId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                var currentUserId = User.FindFirst("UserId")?.Value;
                if (string.IsNullOrEmpty(currentUserId))
                {
                    return Unauthorized();
                }

                await _userService.DeleteUserAsync(userId, currentUserId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
} 