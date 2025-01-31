namespace appdev.DTOs
{
    public class CreateOrgDto
    {
        public string OrgName { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Classification { get; set; }
        public int? CollegeId { get; set; }
        public string? ControlNumber { get; set; } // Ensure this field is present
        public bool Verified { get; set; }
        public string ImageBase64 { get; set; }
        public string? OrgFacebook { get; set; }
        public string? OrgInstagram { get; set; }
        public string? OrgLinkedIn { get; set; }
    }


    public class OrgResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }

    public class OrgResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CollegeId { get; set; }
        public string ImageUrl { get; set; }
        public bool Verified { get; set; }
        public string Email { get; set; }
        public string Classification { get; set; }
        public string? ControlNumber { get; set; }
    }

}
