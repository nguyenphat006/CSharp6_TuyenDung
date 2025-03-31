namespace TuyenDungAPI.Model.ModelBase
{
    public class ApiResponse<T>
    {
        public bool Result { get; set; }
        public int Status { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }

        public ApiResponse(bool result, int status, T? data, string? message = null)
        {
            Result = result;
            Status = status;
            Data = data;
            Message = message;
        }
    }
}
