namespace appdev.DTOs
{
    public class AuthResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public string Token { get; set; }
    }

    public class UserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CollegeId { get; set; }
        public string ProfilePicture { get; set; }
    }
}