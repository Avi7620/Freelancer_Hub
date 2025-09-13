namespace FreelancerHub.Core.DTO
{
    // Generic version for successful responses with data
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public string Details { get; set; }
    }

    // Non-generic version for error responses
    public class ApiResponse
    {
        public bool ? Success { get; set; }
        public string ? Status { get; set; }
        public string ? Message { get; set; }
        public string  ? Details { get; set; }
    }
}