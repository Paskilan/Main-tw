﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using appdev.Models;

#nullable disable

namespace appdev.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CollegeTable", b =>
                {
                    b.Property<int>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<string>("CollegeName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("CollegeId");

                    b.ToTable("CollegeTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.AdminTable", b =>
                {
                    b.Property<int>("AdminId")
                        .HasColumnType("int")
                        .HasColumnName("AdminID");

                    b.Property<string>("AdminName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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

            modelBuilder.Entity("appdev.Models.EventTable", b =>
                {
                    b.Property<int>("EventId")
                        .HasColumnType("int")
                        .HasColumnName("EventID");

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
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("EventLocation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("EventMode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("EventRegistration")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("StudentId", "OrgId");

                    b.HasIndex("OrgId");

                    b.ToTable("FollowedOrgsTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.OrgHighlightsTable", b =>
                {
                    b.Property<int>("OrgHighlightsId")
                        .HasColumnType("int")
                        .HasColumnName("OrgHighlightsID");

                    b.Property<string>("OrgHighlightsDescription")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("OrgHighlightsTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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
                        .HasColumnType("int")
                        .HasColumnName("OrgID");

                    b.Property<int>("CollegeId")
                        .HasColumnType("int")
                        .HasColumnName("CollegeID");

                    b.Property<string>("OrgDescription")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("OrgEmail")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("OrgFacebook")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<byte[]>("OrgHeader")
                        .IsRequired()
                        .HasColumnType("image");

                    b.Property<string>("OrgInstagram")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("OrgLinkedIn")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<byte[]>("OrgLogo")
                        .IsRequired()
                        .HasColumnType("image");

                    b.Property<string>("OrgName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("OrgType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Verified")
                        .IsRequired()
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("char(10)")
                        .IsFixedLength();

                    b.HasKey("OrgId");

                    b.HasIndex("CollegeId");

                    b.ToTable("OrgTable", (string)null);
                });

            modelBuilder.Entity("appdev.Models.ReportTable", b =>
                {
                    b.Property<int>("ReportId")
                        .HasColumnType("int")
                        .HasColumnName("ReportID");

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
                        .HasColumnType("int")
                        .HasColumnName("StudentID");

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
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

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
                    b.HasOne("CollegeTable", "College")
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
                    b.HasOne("CollegeTable", "College")
                        .WithMany("OrgTables")
                        .HasForeignKey("CollegeId")
                        .IsRequired()
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
                    b.HasOne("CollegeTable", "College")
                        .WithMany("StudentTables")
                        .HasForeignKey("CollegeId")
                        .IsRequired()
                        .HasConstraintName("FK_StudentTable_CollegeTable");

                    b.Navigation("College");
                });

            modelBuilder.Entity("CollegeTable", b =>
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
