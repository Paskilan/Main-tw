using Microsoft.EntityFrameworkCore;
namespace appdev.Models
{
    public class Organization
    {
        public int OrgID { get; set; }
        public string? OrgName { get; set; }
        public string? CollegeID { get; set; }
        public char Verified { get; set; }
        public int ControlNumber { get; set; }
        public string? OrgEmail { get; set; }
        public string? OrgDescription { get; set; }
        public byte[]? OrgLogo { get; set; }
        public byte[]? OrgHeader { get; set; }
        public int FollowerCount { get; set; }
        public string? OrgType { get; set; }
        public string? OrgFacebook { get; set; }
        public string? OrgInstagram { get; set; }
        public string? OrgLinkedIn { get; set; }
    }

}
