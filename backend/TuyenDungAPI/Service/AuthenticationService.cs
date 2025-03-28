using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Database;
using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Service
{
    public class AuthService 
    {
        private readonly DataContext _dbContext;
        private readonly IConfiguration _config;

        public AuthService(DataContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }

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


        //public async Task<LoginResponse?> LoginAsync(string email, string password)
        //{
        //    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        //    if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        //        return null; // Sai email hoặc mật khẩu

        //    string token = GenerateToken(user);
        //    return new LoginResponse(user, token);
        //}

        public async Task<ApiResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return new ApiResponse<LoginResponse>(false, 401, null, "Email hoặc mật khẩu không đúng!");
            }

            string token = GenerateToken(user);
            var loginResponse = new LoginResponse(user, token);
            return new ApiResponse<LoginResponse>(true, 200, loginResponse);
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
    }
}
