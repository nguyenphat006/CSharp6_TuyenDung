// TuyenDungAPI.Controllers/UserController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.User;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
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
        /// <summary>
        /// Tạo người dùng mới
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var currentUser = HttpContext.User; // ✅ Lấy ClaimsPrincipal từ HttpContext.User
            var response = await _userService.CreateUserAsync(request, currentUser);

            return StatusCode(response.Status, response);
        }


        /// <summary>
        /// Cập nhật thông tin người dùng
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
        {                                                                   
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var user = HttpContext.User;
            var response = await _userService.UpdateUserAsync(request, user);
            return StatusCode(response.Status, response);
        }


        /// <summary>
        /// Xóa một hoặc nhiều người dùng
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteUsers([FromBody] DeleteUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }
            var user = HttpContext.User;
            var response = await _userService.DeleteUsersAsync(request.UserIds, user);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Xóa một người dùng theo ID
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = HttpContext.User;
            var response = await _userService.DeleteUsersAsync(new List<Guid> { id }, user);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Đổi mật khẩu người dùng
        /// </summary>
        [HttpPut("{id}/reset-password")]
        public async Task<IActionResult> ResetPassword(Guid id, [FromBody] ResetPasswordUserRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = HttpContext.User;
            var result = await _userService.ResetPasswordUserAsync(request, id, user);
            return StatusCode(result.Status, result);
        }

    }
}