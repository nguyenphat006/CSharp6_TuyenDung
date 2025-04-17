using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.User;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RolesController(RoleService roleService)
        {
            _roleService = roleService;
        }

        /// <summary>
        /// Lấy danh sách tất cả các vai trò trong hệ thống.
        /// </summary>
        /// <returns>Danh sách các vai trò</returns>
        [HttpGet]
        [SwaggerOperation(Summary = "Lấy danh sách tất cả các vai trò trong hệ thống")]
        public async Task<IActionResult> GetAllRoles()
        {
            var response = await _roleService.GetAllRolesAsync();
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Tạo một vai trò mới trong hệ thống.
        /// </summary>
        /// <param name="request">Thông tin vai trò mới cần tạo</param>
        /// <returns>Kết quả tạo vai trò</returns>
        [HttpPost]
        [SwaggerOperation(Summary = "Tạo một vai trò mới trong hệ thống")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var currentUser = HttpContext.User;
            var response = await _roleService.CreateRoleAsync(request, currentUser);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Cập nhật thông tin một vai trò trong hệ thống.
        /// </summary>
        /// <param name="id">ID vai trò cần cập nhật</param>
        /// <param name="request">Thông tin vai trò cần cập nhật</param>
        /// <returns>Kết quả cập nhật vai trò</returns>
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Cập nhật thông tin một vai trò trong hệ thống")]
        public async Task<IActionResult> UpdateRole(Guid id, [FromBody] UpdateRoleRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var currentUser = HttpContext.User;
            var response = await _roleService.UpdateRoleAsync(id, request, currentUser);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Xóa một hoặc nhiều vai trò trong hệ thống.
        /// </summary>
        /// <param name="request">Danh sách các vai trò cần xóa</param>
        /// <returns>Kết quả xóa vai trò</returns>
        [HttpDelete]
        [SwaggerOperation(Summary = "Xóa một hoặc nhiều vai trò trong hệ thống")]
        public async Task<IActionResult> DeleteRoles([FromBody] DeleteRolesRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var currentUser = HttpContext.User;
            var response = await _roleService.DeleteRolesAsync(request, currentUser);
            return StatusCode(response.Status, response);
        }


    }
}
