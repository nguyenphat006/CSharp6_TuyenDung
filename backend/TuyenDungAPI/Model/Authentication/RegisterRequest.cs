﻿namespace TuyenDungAPI.Model.Authentication
{
    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = "Unknown";
        public string Password { get; set; } = string.Empty;
    }
}
