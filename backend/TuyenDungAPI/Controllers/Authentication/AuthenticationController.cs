using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuyenDungAPI.Service;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Controllers.Authentication
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly EmailService _emailService;

        public AuthenticationController(AuthService authService, EmailService emailService)
        {
            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var response = await _authService.RegisterAsync(request);
            return StatusCode(response.Status, response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request.Email, request.Password);
            return StatusCode(response.Status, response);
        }

        [Authorize] // ✅ Yêu cầu token hợp lệ để logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Lấy email từ token (vì user đã đăng nhập nên sẽ có email trong token)
            string email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;

            var response = await _authService.LogoutAsync(email);
            return StatusCode(response.Status, response);
        }


        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
            return StatusCode(response.Status, response);
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOTPRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { success = false, message = "Email không được để trống!" });
            }

            var reponse = await _authService.RequestOtpAsync(request.Email);
            return StatusCode(reponse.Status, reponse);
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
