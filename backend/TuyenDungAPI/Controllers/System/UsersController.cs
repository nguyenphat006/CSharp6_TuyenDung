// TuyenDungAPI.Controllers/UserController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
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
        /// Lấy danh sách tất cả người dùng trong hệ thống.
        /// </summary>
        /// <returns>Danh sách người dùng</returns>
        [HttpGet]
        [SwaggerOperation(Summary = "Lấy danh sách tất cả người dùng trong hệ thống")]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsersAsync();
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Lấy thông tin chi tiết của một người dùng theo ID.
        /// </summary>
        /// <param name="id">ID người dùng cần lấy thông tin</param>
        /// <returns>Thông tin người dùng</returns>
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Lấy thông tin chi tiết của một người dùng theo ID")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var response = await _userService.GetUserByIdAsync(id);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Tạo một người dùng mới trong hệ thống.
        /// </summary>
        /// <param name="request">Thông tin người dùng mới cần tạo</param>
        /// <returns>Kết quả tạo người dùng</returns>
        [HttpPost]
        [SwaggerOperation(Summary = "Tạo một người dùng mới trong hệ thống")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var currentUser = HttpContext.User;
            var response = await _userService.CreateUserAsync(request, currentUser);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Cập nhật thông tin người dùng.
        /// </summary>
        /// <param name="request">Thông tin người dùng cần cập nhật</param>
        /// <returns>Kết quả cập nhật thông tin người dùng</returns>
        [HttpPut]
        [SwaggerOperation(Summary = "Cập nhật thông tin người dùng")]
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
        /// Xóa một hoặc nhiều người dùng theo danh sách ID.
        /// </summary>
        /// <param name="request">Danh sách các ID người dùng cần xóa</param>
        /// <returns>Kết quả xóa người dùng</returns>
        [HttpDelete]
        [SwaggerOperation(Summary = "Xóa một hoặc nhiều người dùng theo danh sách ID")]
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
        /// Xóa một người dùng theo ID.
        /// </summary>
        /// <param name="id">ID người dùng cần xóa</param>
        /// <returns>Kết quả xóa người dùng</returns>
        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Xóa một người dùng theo ID")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = HttpContext.User;
            var response = await _userService.DeleteUsersAsync(new List<Guid> { id }, user);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Đổi mật khẩu người dùng.
        /// </summary>
        /// <param name="id">ID người dùng cần đổi mật khẩu</param>
        /// <param name="request">Thông tin mật khẩu mới</param>
        /// <returns>Kết quả đổi mật khẩu</returns>
        [HttpPut("{id}/reset-password")]
        [SwaggerOperation(Summary = "Đổi mật khẩu người dùng")]
        public async Task<IActionResult> ResetPassword(Guid id, [FromBody] ResetPasswordUserRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = HttpContext.User;
            var result = await _userService.ResetPasswordUserAsync(request, id, user);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Người dùng tự đổi mật khẩu (yêu cầu mật khẩu cũ + mới)
        /// </summary>
        /// <param name="request">Thông tin đổi mật khẩu</param>
        /// <returns>Kết quả đổi mật khẩu</returns>
        [HttpPut("change-password")]
        [SwaggerOperation(Summary = "Người dùng đổi mật khẩu (cần nhập mật khẩu cũ)")]
        public async Task<IActionResult> ChangePasswordUser([FromBody] ChangePasswordUserRequest request)
        {
            var result = await _userService.ChangePasswordUserAsync(request, User);
            return StatusCode(result.Status, result);
        }



    }
}