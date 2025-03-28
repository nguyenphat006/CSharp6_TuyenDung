namespace TuyenDungAPI.Model.Authentication
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public object Data { get; set; }

        public LoginResponse(User user, string token, string refreshToken)
        {
            Token = token;
            RefreshToken = refreshToken;
            Data = new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                Gender = user.Gender,
                Role = user.Role
            };
        }
    }
}
