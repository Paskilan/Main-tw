using appdev.Models;
using Microsoft.EntityFrameworkCore;

namespace appdev
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> StudentTable { get; set; }
        public DbSet<Admin> AdminTable { get; set; }
        public DbSet<Organization> OrganizationTable { get; set; }
        public DbSet<Event> EventTable { get; set; }
        public DbSet<College> CollegeTable { get; set; }
        public DbSet<OrgHighlights> OrgHighlightsTable { get; set; }
        public DbSet<FollowedOrgs> FollowedOrgsTable { get; set; }
        public DbSet<Report> ReportTable { get; set; }
    }
}
