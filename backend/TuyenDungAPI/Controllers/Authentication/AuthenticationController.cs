using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuyenDungAPI.Service;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Model.ModelBase;
using Swashbuckle.AspNetCore.Annotations;

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
        /// Đăng ký tài khoản người dùng mới trong hệ thống.
        /// </summary>
        /// <param name="request">Thông tin đăng ký tài khoản (bao gồm email, mật khẩu, v.v.)</param>
        /// <returns>Kết quả đăng ký, có thể bao gồm thông báo thành công hoặc lỗi</returns>
        [HttpPost("register")]
        [SwaggerOperation(Summary = "Đăng ký tài khoản người dùng mới trong hệ thống")]
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
        /// Đăng nhập tài khoản người dùng với email và mật khẩu.
        /// </summary>
        /// <param name="request">Thông tin đăng nhập (email và mật khẩu)</param>
        /// <returns>Kết quả đăng nhập và token JWT</returns>
        [HttpPost("login")]
        [SwaggerOperation(Summary = "Đăng nhập tài khoản người dùng với email và mật khẩu")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request.Email, request.Password);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Đăng xuất tài khoản người dùng (Yêu cầu token hợp lệ).
        /// </summary>
        /// <returns>Kết quả đăng xuất</returns>
        [Authorize] // ✅ Yêu cầu token hợp lệ để logout
        [HttpPost("logout")]
        [SwaggerOperation(Summary = "Đăng xuất tài khoản người dùng (Yêu cầu token hợp lệ)")]
        public async Task<IActionResult> Logout()
        {
            string email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;

            var response = await _authService.LogoutAsync(email);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Cung cấp API Refresh-token để lấy token mới bằng refresh token.
        /// </summary>
        /// <param name="request">Thông tin yêu cầu refresh token (token hiện tại và refresh token)</param>
        /// <returns>Token mới và refresh token mới</returns>
        [HttpPost("refresh-token")]
        [SwaggerOperation(Summary = "Cung cấp API Refresh-token để lấy token mới bằng refresh token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Gửi mã OTP đến email của người dùng để xác thực.
        /// </summary>
        /// <param name="request">Thông tin email yêu cầu gửi OTP</param>
        /// <returns>Kết quả gửi mã OTP</returns>
        [HttpPost("send-otp")]
        [SwaggerOperation(Summary = "Gửi mã OTP đến email của người dùng để xác thực")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { success = false, message = "Email không được để trống!" });
            }

            var response = await _authService.RequestOtpAsync(request.Email);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Xác thực mã OTP đã gửi đến email.
        /// </summary>
        /// <param name="request">Thông tin OTP và email để xác thực</param>
        /// <returns>Kết quả xác thực OTP</returns>
        [HttpPost("verify-code")]
        [SwaggerOperation(Summary = "Xác thực mã OTP đã gửi đến email")]
        public async Task<IActionResult> VerifyCode([FromBody] VerificationRequest request)
        {
            if (string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest(new { success = false, message = "Mã OTP không được để trống" });
            }
            var response = await _authService.VerifyOtpAsync(request.Email, request.Otp);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// API để người dùng thay đổi mật khẩu mới.
        /// </summary>
        /// <param name="request">Thông tin email và mật khẩu mới</param>
        /// <returns>Kết quả thay đổi mật khẩu</returns>
        [HttpPost("reset-password")]
        [SwaggerOperation(Summary = "API để người dùng thay đổi mật khẩu mới")]
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
