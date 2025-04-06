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
    public class PagedResult<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);
        public List<T> Items { get; set; } = new();
    }

}
