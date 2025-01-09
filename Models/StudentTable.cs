using Microsoft.EntityFrameworkCore;
namespace appdev.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string? StudentFirstName { get; set; }
        public string? StudentLastName { get; set; }
        public string? StudentEmail { get; set; }
        public string? StudentPassword { get; set; }
        public string? CollegeID { get; set; }
        public string? FollowedOrgs { get; set; }
        public char OrgAdmin { get; set; }
    }

}
