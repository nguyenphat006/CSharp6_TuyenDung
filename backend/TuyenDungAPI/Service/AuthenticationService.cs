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
        //private readonly DataContext _dbContext;
        //private readonly IConfiguration _config;

        //public AuthService(DataContext dbContext, IConfiguration config)
        //{
        //    _dbContext = dbContext;
        //    _config = config;
        //}

        private readonly DataContext _dbContext;
        private readonly IConfiguration _config;
        private readonly JwtSettings _jwtSettings;
        private readonly byte[] _secretKey;

        public AuthService(DataContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;

            _jwtSettings = new JwtSettings
            {
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SecretKey = _config["JwtSettings:SecretKey"],
                ExpireMinutes = Convert.ToDouble(_config["JwtSettings:ExpireMinutes"])
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

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Age = request.Age,
                Gender = request.Gender,
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return new ApiResponse<RegisterResponse>(true, 201, new RegisterResponse("Đăng ký thành công!"));
        }


        // LOGIN ACCOUNT
        //public async Task<ApiResponse<LoginResponse>> LoginAsync(string email, string password)
        //{
        //    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        //    if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        //    {
        //        return new ApiResponse<LoginResponse>(false, 401, null, "Email hoặc mật khẩu không đúng!");
        //    }

        //    string token = GenerateToken(user);
        //    var loginResponse = new LoginResponse(user, token, refreshToken);
        //    return new ApiResponse<LoginResponse>(true, 200, loginResponse);
        //}

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

            public async Task<LoginResponse?> RefreshTokenAsync(string token, string refreshToken)
            {
                var principal = GetPrincipalFromExpiredToken(token);
                if (principal == null)
                    return null;

                string email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiry < DateTime.UtcNow)
                    return null;

                string newToken = GenerateToken(user);
                string newRefreshToken = GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
                await _dbContext.SaveChangesAsync();

                return new LoginResponse(user, newToken, newRefreshToken);
            }


            private string GenerateToken(User user)
            {
                var jwtSettings = _config.GetSection("JwtSettings");
                var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(ClaimTypes.Role, "User") // Default role
                };

                var token = new JwtSecurityToken(
                    issuer: jwtSettings["Issuer"],
                    audience: jwtSettings["Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        #endregion

    }
}
