using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace appdev.Migrations
{
    /// <inheritdoc />
    public partial class AddCollegeOrgModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CollegeId1",
                table: "StudentTable",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ControlNumber",
                table: "OrgTable",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FollowerCount",
                table: "OrgTable",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "FollowedOrgsTable",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AdminName",
                table: "AdminTable",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_StudentTable_CollegeId1",
                table: "StudentTable",
                column: "CollegeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentTable_CollegeTable_CollegeId1",
                table: "StudentTable",
                column: "CollegeId1",
                principalTable: "CollegeTable",
                principalColumn: "CollegeID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentTable_CollegeTable_CollegeId1",
                table: "StudentTable");

            migrationBuilder.DropIndex(
                name: "IX_StudentTable_CollegeId1",
                table: "StudentTable");

            migrationBuilder.DropColumn(
                name: "CollegeId1",
                table: "StudentTable");

            migrationBuilder.DropColumn(
                name: "ControlNumber",
                table: "OrgTable");

            migrationBuilder.DropColumn(
                name: "FollowerCount",
                table: "OrgTable");

            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "FollowedOrgsTable");

            migrationBuilder.DropColumn(
                name: "AdminName",
                table: "AdminTable");
        }
    }
}
