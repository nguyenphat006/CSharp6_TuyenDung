using TuyenDungAPI.Model.User;

namespace TuyenDungAPI.Model.Authentication
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public object Data { get; set; }

        public LoginResponse(User.User user, string token, string RefreshToken_)
        {
            Token = token;
            RefreshToken = RefreshToken_;
            Data = new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                Gender = user.Gender,
                Role = user.Role,
                CreateAt = user.CreatedAt
            };
        }
    }
    public class RefreshTokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }

        public RefreshTokenResponse(string token, string refreshToken)
        {
            Token = token;
            RefreshToken = refreshToken;
        }

        public RefreshTokenResponse() { }
    }

}
