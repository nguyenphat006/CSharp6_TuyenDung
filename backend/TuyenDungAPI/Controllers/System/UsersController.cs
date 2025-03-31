// TuyenDungAPI.Controllers/UserController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.User;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize] // 🔐 Yêu cầu xác thực token
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Lấy danh sách tất cả người dùng
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsersAsync();
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Lấy thông tin của một người dùng theo ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var response = await _userService.GetUserByIdAsync(id);
            return StatusCode(response.Status, response);
        }
    }
}