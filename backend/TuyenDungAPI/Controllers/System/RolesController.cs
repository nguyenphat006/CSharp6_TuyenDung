using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.User;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RolesController(RoleService roleService)
        {
            _roleService = roleService;
        }

        /// <summary>
        /// Lấy danh sách tất cả các vai trò
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllRoles()
        {
            var response = await _roleService.GetAllRolesAsync();
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Tạo vai trò mới
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var response = await _roleService.CreateRoleAsync(request);
            return StatusCode(response.Status, response);
        }
    }
}
