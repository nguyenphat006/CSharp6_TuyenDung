using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuyenDungAPI.Service;
using TuyenDungAPI.Model.Authentication;

namespace TuyenDungAPI.Controllers.Authentication
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthenticationController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = await _authService.RegisterAsync(request.Name, request.Email, request.Age, request.Gender, request.Password);
            if (user == null)
                return BadRequest(new { message = "Email đã tồn tại!" });

            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email, request.Password);
            if (token == null)
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng!" });

            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);

            return Ok(new { userId, email, role });
        }
    }
}
