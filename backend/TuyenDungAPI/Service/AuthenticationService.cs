    using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Database;
using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model.ModelBase;
using System.Security.Cryptography;
using TuyenDungAPI.Model.User;

namespace TuyenDungAPI.Service
{
    public class JwtSettings
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecretKey { get; set; }
        public double ExpireMinutes { get; set; }
    }


    public class AuthService 
    {
        private readonly EmailService _emailService;
        private readonly DataContext _dbContext;
        private readonly IConfiguration _config;
        private readonly JwtSettings _jwtSettings;
        private readonly byte[] _secretKey;

        public AuthService(DataContext dbContext, IConfiguration config, EmailService emailService)
        {
            _dbContext = dbContext;
            _config = config;
            _emailService = emailService;

            _jwtSettings = new JwtSettings
            {
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SecretKey = _config["JwtSettings:SecretKey"],
                ExpireMinutes = Convert.ToDouble(_config["JwtSettings:ExpireMinutes"]),
            };

            _secretKey = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);
        }

        // REGISTER USER
        public async Task<ApiResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
        {
            if (await _dbContext.Users.AnyAsync(u => u.Email == request.Email))
            {
                return new ApiResponse<RegisterResponse>(false, 400, null, "Email đã tồn tại!");
            }

            // Tạo user mới
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            string refreshToken = GenerateRefreshToken();
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                RefreshToken = refreshToken,
                RefreshTokenExpiry = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow
            };

            // Tìm kiếm Role "User" trong DB
            var userRole = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Name == "User");

            // Nếu không tồn tại, tạo role mới
            if (userRole == null)
            {
                userRole = new Role
                {
                    Name = "User",
                };
                _dbContext.Roles.Add(userRole);
                await _dbContext.SaveChangesAsync();
            }

            // Thêm user vào DB
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Tạo UserRole để liên kết User với Role
            var userRoleAssignment = new UserRole
            {
                UserId = user.Id,
                RoleId = userRole.Id
            };

            _dbContext.UserRoles.Add(userRoleAssignment);
            await _dbContext.SaveChangesAsync();

            return new ApiResponse<RegisterResponse>(true, 201, new RegisterResponse("Đăng ký thành công!"));
        }
        // LOGIN ACCOUNT
        public async Task<ApiResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return new ApiResponse<LoginResponse>(false, 401, null, "Email hoặc mật khẩu không đúng!");
            }

            // Sử dụng hàm GenerateJwtToken mới với đầy đủ role từ bảng UserRoles
            string token = await GenerateJwtToken(user);
            string refreshToken = GenerateRefreshToken();

            // Cập nhật Refresh Token & hạn sử dụng vào database
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _dbContext.SaveChangesAsync();

            var loginResponse = new LoginResponse(user, token, refreshToken);
            return new ApiResponse<LoginResponse>(true, 200, loginResponse, "Đăng nhập thành công!");
        }

        public async Task<ApiResponse<string>> LogoutAsync(string email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return new ApiResponse<string>(false, 404, null, "Người dùng không tồn tại!");
            }

            // Xóa Refresh Token khỏi database
            user.RefreshToken = null;
            user.RefreshTokenExpiry = DateTime.UtcNow; // Đặt thời gian hết hạn thành thời điểm hiện tại
            await _dbContext.SaveChangesAsync();

            return new ApiResponse<string>(true, 200, "Đăng xuất thành công!");
        }

        public async Task<ApiResponse<string>> RequestOtpAsync(string email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return new ApiResponse<string>(false, 404, null, "Email không tồn tại!");

            // ✅ Xóa OTP cũ (nếu có) để tránh spam OTP
            var existingOtp = await _dbContext.OtpVerifications.FirstOrDefaultAsync(o => o.UserId == user.Id);
            if (existingOtp != null)
            {
                _dbContext.OtpVerifications.Remove(existingOtp);
                await _dbContext.SaveChangesAsync();
            }

            // ✅ Tạo OTP 6 chữ số
            string otp = new Random().Next(100000, 999999).ToString();

            // ✅ Lưu OTP mới vào bảng OtpVerification
            var otpRecord = new OtpVerification
            {
                UserId = user.Id,
                OtpCode = otp,
                OtpExpiry = DateTime.UtcNow.AddMinutes(5) // OTP hết hạn sau 5 phút
            };

            _dbContext.OtpVerifications.Add(otpRecord);
            await _dbContext.SaveChangesAsync();

            // ✅ Gửi email chứa OTP
            string subject = "Mã OTP đặt lại mật khẩu";
            string body = $"Mã OTP của bạn là: <b>{otp}</b>. Mã có hiệu lực trong 5 phút.";
            await _emailService.SendEmailAsync(email, subject, body);

            return new ApiResponse<string>(true, 200, "OTP đã được gửi tới email!");
        }


        public async Task<ApiResponse<string>> VerifyOtpAsync(string email, string otp)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return new ApiResponse<string>(false, 404, null, "Email không tồn tại!");

            var otpRecord = await _dbContext.OtpVerifications.FirstOrDefaultAsync(o => o.UserId == user.Id);
            if (otpRecord == null || otpRecord.OtpCode != otp)
                return new ApiResponse<string>(false, 400, null, "OTP không hợp lệ!");

            if (otpRecord.OtpExpiry < DateTime.UtcNow)
                return new ApiResponse<string>(false, 400, null, "OTP đã hết hạn!");

            // ✅ Nếu OTP hợp lệ, có thể thực hiện bước tiếp theo (ví dụ: reset password)
            return new ApiResponse<string>(true, 200, "Xác thực OTP thành công!");
        }

        public async Task<ApiResponse<string>> ResetPasswordAsync(string email, string newPassword)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return new ApiResponse<string>(false, 404, null, "Email không tồn tại!");

            // ✅ Cập nhật mật khẩu mới (hash password)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            await _dbContext.SaveChangesAsync();

            return new ApiResponse<string>(true, 200, "Mật khẩu đã được đặt lại thành công!");
        }

        #region TOKEN
            private string GenerateRefreshToken()
            {
                var randomNumber = new byte[32];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(randomNumber);
                    return Convert.ToBase64String(randomNumber);
                }
            }

            private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false, // Bỏ qua kiểm tra thời hạn
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _jwtSettings.Issuer,
                    ValidAudience = _jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey))
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
                var jwtSecurityToken = securityToken as JwtSecurityToken;

                if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }

        public async Task<ApiResponse<RefreshTokenResponse>> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiredToken(token);
            if (principal == null)
                return new ApiResponse<RefreshTokenResponse>(false, 401, null, "Token không hợp lệ!");

            string userIdStr = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value!;

            if (!Guid.TryParse(userIdStr, out Guid userId))
                return new ApiResponse<RefreshTokenResponse>(false, 401, null, "Token không hợp lệ!");

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                return new ApiResponse<RefreshTokenResponse>(false, 401, null, "Refresh Token không hợp lệ hoặc đã hết hạn!");
            }

            // Sử dụng hàm GenerateJwtToken mới để tạo token với đầy đủ roles
            string newToken = await GenerateJwtToken(user);
            string newRefreshToken = GenerateRefreshToken();

            // Cập nhật Refresh Token và hạn sử dụng
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _dbContext.SaveChangesAsync();

            var refreshTokenResponse = new RefreshTokenResponse
            {
                Token = newToken,
                RefreshToken = newRefreshToken
            };

            return new ApiResponse<RefreshTokenResponse>(true, 200, refreshTokenResponse, "Refresh Token thành công!");
        }





        //private string GenerateToken(User user)
        //{
        //    var jwtSettings = _config.GetSection("JwtSettings");
        //    var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);

        //    var claims = new List<Claim>
        //        {
        //            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        //            new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //            new Claim(ClaimTypes.Role, "User") // Default role
        //        };

        //    var token = new JwtSecurityToken(
        //        issuer: jwtSettings["Issuer"],
        //        audience: jwtSettings["Audience"],
        //        claims: claims,
        //        expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
        //        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256)
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        public async Task<string> GenerateJwtToken(User user)
        {
            // Lấy danh sách roles của user từ bảng UserRoles
            var userRoles = await _dbContext.UserRoles
                .Where(ur => ur.UserId == user.Id)
                .Include(ur => ur.Role)
                .Select(ur => ur.Role.Name)
                .ToListAsync();

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Name),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        // Thêm các claims khác nếu cần
    };

            // Thêm role claims
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // Tiếp tục tạo token như bình thường
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["JwtSettings:Issuer"],
                _config["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion

    }
}
