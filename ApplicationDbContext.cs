using appdev.Models;
using Microsoft.EntityFrameworkCore;

namespace appdev
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<College> Colleges { get; set; }
        public DbSet<OrgHighlight> OrgHighlights { get; set; }
        public DbSet<FollowedOrg> FollowedOrgs { get; set; }
        public DbSet<Report> Reports { get; set; }
    }
}
