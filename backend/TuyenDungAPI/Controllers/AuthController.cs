using Microsoft.AspNetCore.Mvc;
using TuyenDungAPI.Models.DTOs;
using TuyenDungAPI.Services;

namespace TuyenDungAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDTO signupDTO)
        {
            try
            {
                var createUserDTO = new CreateUserDTO
                {
                    Name = signupDTO.Name,
                    Email = signupDTO.Email,
                    Password = signupDTO.Password,
                    Age = signupDTO.Age,
                    Gender = signupDTO.Gender,
                    Address = signupDTO.Address
                };

                var user = await _userService.CreateUserAsync(createUserDTO, "System");
                var authResponse = await _authService.LoginAsync(new LoginDTO
                {
                    Email = signupDTO.Email,
                    Password = signupDTO.Password
                });

                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            try
            {
                var authResponse = await _authService.LoginAsync(loginDTO);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            try
            {
                var authResponse = await _authService.RefreshTokenAsync(refreshToken);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
} 