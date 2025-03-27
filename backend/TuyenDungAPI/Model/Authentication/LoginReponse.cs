namespace TuyenDungAPI.Model.Authentication
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public object Data { get; set; }

        public LoginResponse(User user, string token)
        {
            Token = token;
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
