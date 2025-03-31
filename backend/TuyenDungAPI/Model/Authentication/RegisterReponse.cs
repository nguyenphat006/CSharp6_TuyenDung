namespace TuyenDungAPI.Model.Authentication
{
    public class RegisterResponse
    {
        public string Message { get; set; }

        public RegisterResponse(string message)
        {
            Message = message;
        }
    }
}
