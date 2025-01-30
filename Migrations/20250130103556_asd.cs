using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace appdev.Migrations
{
    /// <inheritdoc />
    public partial class asd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CollegeTable",
                columns: table => new
                {
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    CollegeName = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollegeTable", x => x.CollegeID);
                });

            migrationBuilder.CreateTable(
                name: "OrgTable",
                columns: table => new
                {
                    OrgID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrgName = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    OrgEmail = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    OrgDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    OrgType = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    OrgFacebook = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    OrgInstagram = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    OrgLinkedIn = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    OrgLogo = table.Column<byte[]>(type: "image", nullable: false),
                    OrgHeader = table.Column<byte[]>(type: "image", nullable: true),
                    Verified = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CollegeID = table.Column<int>(type: "int", nullable: true),
                    OrgApproved = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ControlNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    FollowerCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgTable", x => x.OrgID);
                    table.ForeignKey(
                        name: "FK_OrgTable_CollegeTable",
                        column: x => x.CollegeID,
                        principalTable: "CollegeTable",
                        principalColumn: "CollegeID");
                });

            migrationBuilder.CreateTable(
                name: "StudentTable",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentFirstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentLastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    StudentEmail = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    StudentPassword = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    StudentProfilePicture = table.Column<byte[]>(type: "image", nullable: false),
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
                name: "EventTable",
                columns: table => new
                {
                    EventID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventName = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgName = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    RSVPCount = table.Column<int>(type: "int", nullable: false),
                    EventHost = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    EventDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    EventHeader = table.Column<byte[]>(type: "image", nullable: false),
                    EventDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EventMode = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    EventLocation = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    EventState = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: false),
                    CollegeID = table.Column<int>(type: "int", nullable: false),
                    EventRegistration = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false)
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
                name: "OrgHighlightsTable",
                columns: table => new
                {
                    OrgHighlightsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    OrgHighlightsTitle = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    OrgHighlightsDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
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
                name: "AdminTable",
                columns: table => new
                {
                    AdminID = table.Column<int>(type: "int", nullable: false),
                    OrgID = table.Column<int>(type: "int", nullable: false),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    AdminName = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    StudentName = table.Column<string>(type: "nvarchar(max)", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "ReportTable",
                columns: table => new
                {
                    ReportID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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

            migrationBuilder.InsertData(
                table: "CollegeTable",
                columns: new[] { "CollegeID", "CollegeName" },
                values: new object[,]
                {
                    { 1, "College of Accountancy and Finance" },
                    { 2, "College of Architecture, Design and the Built Environment" },
                    { 3, "College of Business Administration" },
                    { 4, "College of Computer and Information Sciences" },
                    { 5, "College of Engineering" },
                    { 6, "College of Human Kinetics" },
                    { 7, "College of Law" },
                    { 8, "College of Communication" },
                    { 9, "College of Education" },
                    { 10, "College of Political Science and Public Administration" },
                    { 11, "College of Science" },
                    { 12, "College of Tourism, Hospitality and Transportation Management" },
                    { 13, "Graduate School" },
                    { 14, "Institute of Technology" },
                    { 15, "PUP Laboratory Highschool" },
                    { 16, "PUP Senior Highschool" },
                    { 17, "College of Social Sciences and Development" }
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
                name: "IX_OrgTable_CollegeID",
                table: "OrgTable",
                column: "CollegeID");

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
                name: "OrgTable");

            migrationBuilder.DropTable(
                name: "CollegeTable");
        }
    }
}
