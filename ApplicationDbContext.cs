using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace appdev.Models
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdminTable> Admins { get; set; }
        public virtual DbSet<CollegeTable> Colleges { get; set; }
        public virtual DbSet<EventTable> Events { get; set; }
        public virtual DbSet<FollowedOrgsTable> FollowedOrgs { get; set; }
        public virtual DbSet<OrgHighlightsTable> OrgHighlights { get; set; }
        public virtual DbSet<OrgTable> Orgs { get; set; }
        public virtual DbSet<ReportTable> Reports { get; set; }
        public virtual DbSet<StudentTable> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("Name=DefaultConnection");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminTable>(entity =>
            {
                entity.HasKey(e => e.AdminId);

                entity.ToTable("AdminTable");

                entity.Property(e => e.AdminId)
                    .ValueGeneratedNever()
                    .HasColumnName("AdminID");

                entity.Property(e => e.OrgId).HasColumnName("OrgID");
                entity.Property(e => e.OrgOwner)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
                entity.Property(e => e.StudentId).HasColumnName("StudentID");

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.AdminTables)
                    .HasForeignKey(d => d.OrgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AdminTable_OrgTable");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.AdminTables)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AdminTable_StudentTable");
            });

            modelBuilder.Entity<CollegeTable>(entity =>
            {
                entity.HasKey(e => e.CollegeId);

                entity.ToTable("CollegeTable");

                entity.Property(e => e.CollegeId)
                    .ValueGeneratedNever()
                    .HasColumnName("CollegeID");
                entity.Property(e => e.CollegeName)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CollegeTable>().HasData(
            new CollegeTable { CollegeId = 1, CollegeName = "College of Accountancy and Finance" }
 ,
            new CollegeTable { CollegeId = 2, CollegeName = "College of Architecture, Design and the Built Environment" }
            ,
            new CollegeTable { CollegeId = 3, CollegeName = "College of Business Administration" }
            ,
            new CollegeTable { CollegeId = 4, CollegeName = "College of Computer and Information Sciences" }
            ,
            new CollegeTable { CollegeId = 5, CollegeName = "College of Engineering" }
            ,
            new CollegeTable { CollegeId = 6, CollegeName = "College of Human Kinetics" }
            ,
            new CollegeTable { CollegeId = 7, CollegeName = "College of Law" }
            ,
            new CollegeTable { CollegeId = 8, CollegeName = "College of Communication" }
            ,
            new CollegeTable { CollegeId = 9, CollegeName = "College of Education" }
            ,
            new CollegeTable { CollegeId = 10, CollegeName = "College of Political Science and Public Administration" }
            ,
            new CollegeTable { CollegeId = 11, CollegeName = "College of Science" }
            ,
            new CollegeTable { CollegeId = 12, CollegeName = "College of Tourism, Hospitality and Transportation Management" }
            ,
            new CollegeTable { CollegeId = 13, CollegeName = "Graduate School" }
            ,
            new CollegeTable { CollegeId = 14, CollegeName = "Institute of Technology" }
            ,
            new CollegeTable { CollegeId = 15, CollegeName = "PUP Laboratory Highschool" }
            ,
            new CollegeTable { CollegeId = 16, CollegeName = "PUP Senior Highschool" }
            ,
            new CollegeTable { CollegeId = 17, CollegeName = "College of Social Sciences and Development" }
    );

            modelBuilder.Entity<EventTable>(entity =>
            {
                entity.HasKey(e => e.EventId);

                entity.ToTable("EventTable");

                entity.Property(e => e.EventId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("EventID");
                entity.Property(e => e.CollegeId).HasColumnName("CollegeID");
                entity.Property(e => e.EventDescription).IsUnicode(false);
                entity.Property(e => e.EventHeader).HasColumnType("image");
                entity.Property(e => e.EventHost)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.EventLocation)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.EventMode)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.EventName)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.EventRegistration)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.EventState)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();
                entity.Property(e => e.OrgId).HasColumnName("OrgID");
                entity.Property(e => e.OrgName)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.Rsvpcount).HasColumnName("RSVPCount");

                entity.HasOne(d => d.College)
                    .WithMany(p => p.EventTables)
                    .HasForeignKey(d => d.CollegeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventTable_CollegeTable");

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.EventTables)
                    .HasForeignKey(d => d.OrgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventTable_OrgTable");
            });

            modelBuilder.Entity<FollowedOrgsTable>(entity =>
            {
                entity.HasKey(e => new { e.StudentId, e.OrgId });

                entity.ToTable("FollowedOrgsTable");

                entity.Property(e => e.StudentId).HasColumnName("StudentID");
                entity.Property(e => e.OrgId).HasColumnName("OrgID");
                entity.Property(e => e.OrgName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.FollowedOrgsTables)
                    .HasForeignKey(d => d.OrgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowedOrgsTable_OrgTable");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.FollowedOrgsTables)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowedOrgsTable_StudentTable");
            });

            modelBuilder.Entity<OrgHighlightsTable>(entity =>
            {
                entity.HasKey(e => e.OrgHighlightsId);

                entity.ToTable("OrgHighlightsTable");

                entity.Property(e => e.OrgHighlightsId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("OrgHighlightsID");
                entity.Property(e => e.OrgHighlightsDescription)
                    .IsUnicode(false);
                entity.Property(e => e.OrgHighlightsTitle)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgId).HasColumnName("OrgID");

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.OrgHighlightsTables)
                    .HasForeignKey(d => d.OrgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrgHighlightsTable_OrgTable");
            });

            modelBuilder.Entity<OrgTable>(entity =>
            {
                entity.HasKey(e => e.OrgId);

                entity.ToTable("OrgTable");

                entity.Property(e => e.OrgId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("OrgID");
                entity.Property(e => e.OrgDescription).IsUnicode(false);
                entity.Property(e => e.OrgEmail)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgFacebook)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgHeader).HasColumnType("image");
                entity.Property(e => e.OrgInstagram)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgLinkedIn)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgLogo).HasColumnType("image");
                entity.Property(e => e.OrgName)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.OrgType)
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.Verified)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
                entity.Property(e => e.OrgApproved)
                    .HasMaxLength(5)
                    .IsUnicode(false);
                entity.Property(e => e.CollegeId).HasColumnName("CollegeID");

                entity.HasOne(d => d.College)
                    .WithMany(p => p.OrgTables)
                    .HasForeignKey(d => d.CollegeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrgTable_CollegeTable");
            });

            modelBuilder.Entity<ReportTable>(entity =>
            {
                entity.HasKey(e => e.ReportId);

                entity.ToTable("ReportTable");

                entity.Property(e => e.ReportId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ReportID");
                entity.Property(e => e.EventId).HasColumnName("EventID");
                entity.Property(e => e.OrgId).HasColumnName("OrgID");
                entity.Property(e => e.ReportClassification).IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.ReportTables)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReportTable_EventTable");

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.ReportTables)
                    .HasForeignKey(d => d.OrgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReportTable_OrgTable");
            });

            modelBuilder.Entity<StudentTable>(entity =>
            {
                entity.HasKey(e => e.StudentId);

                entity.ToTable("StudentTable");

                entity.Property(e => e.StudentId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("StudentID");
                entity.Property(e => e.CollegeId).HasColumnName("CollegeID");
                entity.Property(e => e.OrgAdmin)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
                entity.Property(e => e.StudentEmail)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.StudentFirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.StudentLastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.StudentPassword)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.StudentProfilePicture).HasColumnType("image");

                entity.HasOne(d => d.College)   
                    .WithMany(p => p.StudentTables)
                    .HasForeignKey(d => d.CollegeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentTable_CollegeTable");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
