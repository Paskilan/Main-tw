namespace appdev.DTOs
{
    public class CreateOrgDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Verified { get; set; }
        public string ImageUrl { get; set; }
        public string Classification { get; set; }
        public int? CollegeId { get; set; }
        public int ControlNumber { get; set; }
    }

    public class OrgResponseDto<T>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
    }
}
