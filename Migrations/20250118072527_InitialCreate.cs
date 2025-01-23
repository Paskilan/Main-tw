using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace appdev.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrgTable",
                columns: table => new
                {
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Verified = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    ControlNumber = table.Column<int>(type: "int", nullable: true),
                    OrgEmail = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    OrgLogo = table.Column<byte[]>(type: "image", nullable: true),
                    OrgHeader = table.Column<byte[]>(type: "image", nullable: true),
                    FollowerCount = table.Column<int>(type: "int", nullable: false),
                    OrgType = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgFacebook = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgInstagram = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    OrgLinkedIn = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgTable", x => x.OrgID);
                });

            migrationBuilder.CreateTable(
                name: "CollegeTable",
                columns: table => new
                {
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    CollegeName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrganizationName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollegeTable", x => x.CollegeID);
                    table.ForeignKey(
                        name: "FK_CollegeTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                });

            migrationBuilder.CreateTable(
                name: "OrgHighlightsTable",
                columns: table => new
                {
                    OrgHighlightsID = table.Column<int>(type: "int", nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgHighlightsTitle = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgHighlightsDescription = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgHighlightsTable", x => x.OrgHighlightsID);
                    table.ForeignKey(
                        name: "FK_OrgHighlightsTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                });

            migrationBuilder.CreateTable(
                name: "EventTable",
                columns: table => new
                {
                    EventID = table.Column<int>(type: "int", nullable: false),
                    EventName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    RSVPCount = table.Column<int>(type: "int", nullable: false),
                    EventHost = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    EventDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    EventHeader = table.Column<byte[]>(type: "image", nullable: false),
                    EventDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EventMode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    EventLocation = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    EventState = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: false),
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    EventRegistration = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTable", x => x.EventID);
                    table.ForeignKey(
                        name: "FK_EventTable_CollegeTable",
                        column: x => x.CollegeID,
                        principalTable: "CollegeTable",
                        principalColumn: "CollegeID");
                    table.ForeignKey(
                        name: "FK_EventTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                });

            migrationBuilder.CreateTable(
                name: "StudentTable",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    StudentFirstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentLastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentEmail = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentPassword = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    OrgCount = table.Column<int>(type: "int", nullable: false),
                    OrgAdmin = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentTable", x => x.StudentID);
                    table.ForeignKey(
                        name: "FK_StudentTable_CollegeTable",
                        column: x => x.CollegeID,
                        principalTable: "CollegeTable",
                        principalColumn: "CollegeID");
                });

            migrationBuilder.CreateTable(
                name: "ReportTable",
                columns: table => new
                {
                    ReportID = table.Column<int>(type: "int", nullable: false),
                    EventID = table.Column<int>(type: "int", nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    ReportClassification = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportTable", x => x.ReportID);
                    table.ForeignKey(
                        name: "FK_ReportTable_EventTable",
                        column: x => x.EventID,
                        principalTable: "EventTable",
                        principalColumn: "EventID");
                    table.ForeignKey(
                        name: "FK_ReportTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                });

            migrationBuilder.CreateTable(
                name: "AdminTable",
                columns: table => new
                {
                    AdminID = table.Column<int>(type: "int", nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    AdminName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    OrgOwner = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminTable", x => x.AdminID);
                    table.ForeignKey(
                        name: "FK_AdminTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                    table.ForeignKey(
                        name: "FK_AdminTable_StudentTable",
                        column: x => x.StudentID,
                        principalTable: "StudentTable",
                        principalColumn: "StudentID");
                });

            migrationBuilder.CreateTable(
                name: "FollowedOrgsTable",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FollowedOrgsTable", x => new { x.StudentID, x.OrgID });
                    table.ForeignKey(
                        name: "FK_FollowedOrgsTable_OrgTable",
                        column: x => x.OrgID,
                        principalTable: "OrgTable",
                        principalColumn: "OrgID");
                    table.ForeignKey(
                        name: "FK_FollowedOrgsTable_StudentTable",
                        column: x => x.StudentID,
                        principalTable: "StudentTable",
                        principalColumn: "StudentID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminTable_OrgID",
                table: "AdminTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_AdminTable_StudentID",
                table: "AdminTable",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_CollegeTable_OrgID",
                table: "CollegeTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_EventTable_CollegeID",
                table: "EventTable",
                column: "CollegeID");

            migrationBuilder.CreateIndex(
                name: "IX_EventTable_OrgID",
                table: "EventTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_FollowedOrgsTable_OrgID",
                table: "FollowedOrgsTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_OrgHighlightsTable_OrgID",
                table: "OrgHighlightsTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_ReportTable_EventID",
                table: "ReportTable",
                column: "EventID");

            migrationBuilder.CreateIndex(
                name: "IX_ReportTable_OrgID",
                table: "ReportTable",
                column: "OrgID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentTable_CollegeID",
                table: "StudentTable",
                column: "CollegeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminTable");

            migrationBuilder.DropTable(
                name: "FollowedOrgsTable");

            migrationBuilder.DropTable(
                name: "OrgHighlightsTable");

            migrationBuilder.DropTable(
                name: "ReportTable");

            migrationBuilder.DropTable(
                name: "StudentTable");

            migrationBuilder.DropTable(
                name: "EventTable");

            migrationBuilder.DropTable(
                name: "CollegeTable");

            migrationBuilder.DropTable(
                name: "OrgTable");
        }
    }
}
