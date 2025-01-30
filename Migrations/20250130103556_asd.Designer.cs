﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using appdev.Models;

#nullable disable

namespace appdev.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250130103556_asd")]
    partial class asd
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("appdev.Models.AdminTable", b =>
                {
                    b.Property<int>("AdminId")
                        .HasColumnType("int")
                        .HasColumnName("AdminID");

                    b.Property<string>("AdminName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrgId")
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.Property<string>("OrgOwner")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("char(10)")
                        .IsFixedLength();

                    b.Property<int>("StudentId")
                        .HasColumnType("int")
                        .HasColumnName("StudentID");

                    b.HasKey("AdminId");

                    b.HasIndex("OrgId");

                    b.HasIndex("StudentId");

                    b.ToTable("AdminTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.CollegeTable", b =>
                {
                    b.Property<int>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<string>("CollegeName")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.HasKey("CollegeId");

                    b.ToTable("CollegeTable", (string)null);

                    b.HasData(
                        new
                        {
                            CollegeId = 1,
                            CollegeName = "College of Accountancy and Finance"
                        },
                        new
                        {
                            CollegeId = 2,
                            CollegeName = "College of Architecture, Design and the Built Environment"
                        },
                        new
                        {
                            CollegeId = 3,
                            CollegeName = "College of Business Administration"
                        },
                        new
                        {
                            CollegeId = 4,
                            CollegeName = "College of Computer and Information Sciences"
                        },
                        new
                        {
                            CollegeId = 5,
                            CollegeName = "College of Engineering"
                        },
                        new
                        {
                            CollegeId = 6,
                            CollegeName = "College of Human Kinetics"
                        },
                        new
                        {
                            CollegeId = 7,
                            CollegeName = "College of Law"
                        },
                        new
                        {
                            CollegeId = 8,
                            CollegeName = "College of Communication"
                        },
                        new
                        {
                            CollegeId = 9,
                            CollegeName = "College of Education"
                        },
                        new
                        {
                            CollegeId = 10,
                            CollegeName = "College of Political Science and Public Administration"
                        },
                        new
                        {
                            CollegeId = 11,
                            CollegeName = "College of Science"
                        },
                        new
                        {
                            CollegeId = 12,
                            CollegeName = "College of Tourism, Hospitality and Transportation Management"
                        },
                        new
                        {
                            CollegeId = 13,
                            CollegeName = "Graduate School"
                        },
                        new
                        {
                            CollegeId = 14,
                            CollegeName = "Institute of Technology"
                        },
                        new
                        {
                            CollegeId = 15,
                            CollegeName = "PUP Laboratory Highschool"
                        },
                        new
                        {
                            CollegeId = 16,
                            CollegeName = "PUP Senior Highschool"
                        },
                        new
                        {
                            CollegeId = 17,
                            CollegeName = "College of Social Sciences and Development"
                        });
                });

            modelBuilder.Entity("appdev.Models.EventTable", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("EventID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EventId"));

                    b.Property<int>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<DateOnly>("EventDate")
                        .HasColumnType("date");

                    b.Property<string>("EventDescription")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<byte[]>("EventHeader")
                        .IsRequired()
                        .HasColumnType("image");

                    b.Property<string>("EventHost")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("EventLocation")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("EventMode")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("EventRegistration")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("EventState")
                        .IsRequired()
                        .HasMaxLength(1)
                        .IsUnicode(false)
                        .HasColumnType("char(1)")
                        .IsFixedLength();

                    b.Property<int>("OrgId")
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.Property<string>("OrgName")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<int>("Rsvpcount")
                        .HasColumnType("int")
                        .HasColumnName("RSVPCount");

                    b.HasKey("EventId");

                    b.HasIndex("CollegeId");

                    b.HasIndex("OrgId");

                    b.ToTable("EventTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.FollowedOrgsTable", b =>
                {
                    b.Property<int>("StudentId")
                        .HasColumnType("int")
                        .HasColumnName("StudentID");

                    b.Property<int>("OrgId")
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.Property<string>("OrgName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StudentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudentId", "OrgId");

                    b.HasIndex("OrgId");

                    b.ToTable("FollowedOrgsTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.OrgHighlightsTable", b =>
                {
                    b.Property<int>("OrgHighlightsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrgHighlightsID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrgHighlightsId"));

                    b.Property<string>("OrgHighlightsDescription")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("OrgHighlightsTitle")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<int>("OrgId")
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.HasKey("OrgHighlightsId");

                    b.HasIndex("OrgId");

                    b.ToTable("OrgHighlightsTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.OrgTable", b =>
                {
                    b.Property<int>("OrgId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrgId"));

                    b.Property<int?>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<string>("ControlNumber")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("FollowerCount")
                        .HasColumnType("int");

                    b.Property<bool>("OrgApproved")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<string>("OrgDescription")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("OrgEmail")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("OrgFacebook")
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<byte[]>("OrgHeader")
                        .HasColumnType("image");

                    b.Property<string>("OrgInstagram")
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("OrgLinkedIn")
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<byte[]>("OrgLogo")
                        .IsRequired()
                        .HasColumnType("image");

                    b.Property<string>("OrgName")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("OrgType")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<bool>("Verified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.HasKey("OrgId");

                    b.HasIndex("CollegeId");

                    b.ToTable("OrgTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.ReportTable", b =>
                {
                    b.Property<int>("ReportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ReportID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ReportId"));

                    b.Property<int>("EventId")
                        .HasColumnType("int")
                        .HasColumnName("EventID");

                    b.Property<int>("OrgId")
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.Property<string>("ReportClassification")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("ReportId");

                    b.HasIndex("EventId");

                    b.HasIndex("OrgId");

                    b.ToTable("ReportTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.StudentTable", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("StudentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentId"));

                    b.Property<int>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<string>("OrgAdmin")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("char(10)")
                        .IsFixedLength();

                    b.Property<int>("OrgCount")
                        .HasColumnType("int");

                    b.Property<string>("StudentEmail")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("StudentFirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StudentLastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StudentPassword")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<byte[]>("StudentProfilePicture")
                        .IsRequired()
                        .HasColumnType("image");

                    b.HasKey("StudentId");

                    b.HasIndex("CollegeId");

                    b.ToTable("StudentTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.AdminTable", b =>
                {
                    b.HasOne("appdev.Models.OrgTable", "Org")
                        .WithMany("AdminTables")
                        .HasForeignKey("OrgId")
                        .IsRequired()
                        .HasConstraintName("FK_AdminTable_OrgTable");

                    b.HasOne("appdev.Models.StudentTable", "Student")
                        .WithMany("AdminTables")
                        .HasForeignKey("StudentId")
                        .IsRequired()
                        .HasConstraintName("FK_AdminTable_StudentTable");

                    b.Navigation("Org");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("appdev.Models.EventTable", b =>
                {
                    b.HasOne("appdev.Models.CollegeTable", "College")
                        .WithMany("EventTables")
                        .HasForeignKey("CollegeId")
                        .IsRequired()
                        .HasConstraintName("FK_EventTable_CollegeTable");

                    b.HasOne("appdev.Models.OrgTable", "Org")
                        .WithMany("EventTables")
                        .HasForeignKey("OrgId")
                        .IsRequired()
                        .HasConstraintName("FK_EventTable_OrgTable");

                    b.Navigation("College");

                    b.Navigation("Org");
                });

            modelBuilder.Entity("appdev.Models.FollowedOrgsTable", b =>
                {
                    b.HasOne("appdev.Models.OrgTable", "Org")
                        .WithMany("FollowedOrgsTables")
                        .HasForeignKey("OrgId")
                        .IsRequired()
                        .HasConstraintName("FK_FollowedOrgsTable_OrgTable");

                    b.HasOne("appdev.Models.StudentTable", "Student")
                        .WithMany("FollowedOrgsTables")
                        .HasForeignKey("StudentId")
                        .IsRequired()
                        .HasConstraintName("FK_FollowedOrgsTable_StudentTable");

                    b.Navigation("Org");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("appdev.Models.OrgHighlightsTable", b =>
                {
                    b.HasOne("appdev.Models.OrgTable", "Org")
                        .WithMany("OrgHighlightsTables")
                        .HasForeignKey("OrgId")
                        .IsRequired()
                        .HasConstraintName("FK_OrgHighlightsTable_OrgTable");

                    b.Navigation("Org");
                });

            modelBuilder.Entity("appdev.Models.OrgTable", b =>
                {
                    b.HasOne("appdev.Models.CollegeTable", "College")
                        .WithMany("OrgTables")
                        .HasForeignKey("CollegeId")
                        .HasConstraintName("FK_OrgTable_CollegeTable");

                    b.Navigation("College");
                });

            modelBuilder.Entity("appdev.Models.ReportTable", b =>
                {
                    b.HasOne("appdev.Models.EventTable", "Event")
                        .WithMany("ReportTables")
                        .HasForeignKey("EventId")
                        .IsRequired()
                        .HasConstraintName("FK_ReportTable_EventTable");

                    b.HasOne("appdev.Models.OrgTable", "Org")
                        .WithMany("ReportTables")
                        .HasForeignKey("OrgId")
                        .IsRequired()
                        .HasConstraintName("FK_ReportTable_OrgTable");

                    b.Navigation("Event");

                    b.Navigation("Org");
                });

            modelBuilder.Entity("appdev.Models.StudentTable", b =>
                {
                    b.HasOne("appdev.Models.CollegeTable", "College")
                        .WithMany("StudentTables")
                        .HasForeignKey("CollegeId")
                        .IsRequired()
                        .HasConstraintName("FK_StudentTable_CollegeTable");

                    b.Navigation("College");
                });

            modelBuilder.Entity("appdev.Models.CollegeTable", b =>
                {
                    b.Navigation("EventTables");

                    b.Navigation("OrgTables");

                    b.Navigation("StudentTables");
                });

            modelBuilder.Entity("appdev.Models.EventTable", b =>
                {
                    b.Navigation("ReportTables");
                });

            modelBuilder.Entity("appdev.Models.OrgTable", b =>
                {
                    b.Navigation("AdminTables");

                    b.Navigation("EventTables");

                    b.Navigation("FollowedOrgsTables");

                    b.Navigation("OrgHighlightsTables");

                    b.Navigation("ReportTables");
                });

            modelBuilder.Entity("appdev.Models.StudentTable", b =>
                {
                    b.Navigation("AdminTables");

                    b.Navigation("FollowedOrgsTables");
                });
#pragma warning restore 612, 618
        }
    }
}
