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

        /// <summary>
        /// Đăng ký tài khoản người dùng
        /// </summary>
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

        /// <summary>
        /// Đăng nhập tài khoản người dùng
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request.Email, request.Password);
            return StatusCode(response.Status, response);
        }


        /// <summary>
        /// Đăng xuất tài khoản người dùng
        /// </summary>
        [Authorize] // ✅ Yêu cầu token hợp lệ để logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Lấy email từ token (vì user đã đăng nhập nên sẽ có email trong token)
            string email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;

            var response = await _authService.LogoutAsync(email);
            return StatusCode(response.Status, response);
        }


        /// <summary>
        /// API Refresh-token
        /// </summary>
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// API Gửi mã OTP về Email
        /// </summary>
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { success = false, message = "Email không được để trống!" });
            }

            var reponse = await _authService.RequestOtpAsync(request.Email);
            return StatusCode(reponse.Status, reponse);
        }

        /// <summary>
        /// API Xác thực OTP
        /// </summary>
        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyCode([FromBody] VerificationRequest request)
        {
            if (string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest(new { success = false, message = "Mã OTP không được để trống" });
            }
            var reponse = await _authService.VerifyOtpAsync(request.Email ,request.Otp);
            return StatusCode(reponse.Status,reponse);
        }

        /// <summary>
        /// API đổi mật khẩu người dùng 
        /// </summary>
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(new { success = false, message = "Thông tin không đầy đủ!" });
            }

            var response = await _authService.ResetPasswordAsync(request.Email, request.NewPassword);
            return StatusCode(response.Status, response);
        }
    }
}
