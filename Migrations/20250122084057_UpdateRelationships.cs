using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace appdev.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollegeTable_OrgTable",
                table: "CollegeTable");

            migrationBuilder.DropIndex(
                name: "IX_CollegeTable_OrgID",
                table: "CollegeTable");

            migrationBuilder.DropColumn(
                name: "ControlNumber",
                table: "OrgTable");

            migrationBuilder.DropColumn(
                name: "OrgID",
                table: "CollegeTable");

            migrationBuilder.DropColumn(
                name: "OrganizationName",
                table: "CollegeTable");

            migrationBuilder.RenameColumn(
                name: "FollowerCount",
                table: "OrgTable",
                newName: "CollegeID");

            migrationBuilder.AlterColumn<byte[]>(
                name: "OrgLogo",
                table: "OrgTable",
                type: "image",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "image",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OrgLinkedIn",
                table: "OrgTable",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OrgInstagram",
                table: "OrgTable",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<byte[]>(
                name: "OrgHeader",
                table: "OrgTable",
                type: "image",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "image",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrgTable_CollegeID",
                table: "OrgTable",
                column: "CollegeID");

            migrationBuilder.AddForeignKey(
                name: "FK_OrgTable_CollegeTable",
                table: "OrgTable",
                column: "CollegeID",
                principalTable: "CollegeTable",
                principalColumn: "CollegeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrgTable_CollegeTable",
                table: "OrgTable");

            migrationBuilder.DropIndex(
                name: "IX_OrgTable_CollegeID",
                table: "OrgTable");

            migrationBuilder.RenameColumn(
                name: "CollegeID",
                table: "OrgTable",
                newName: "FollowerCount");

            migrationBuilder.AlterColumn<byte[]>(
                name: "OrgLogo",
                table: "OrgTable",
                type: "image",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "image");

            migrationBuilder.AlterColumn<string>(
                name: "OrgLinkedIn",
                table: "OrgTable",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "OrgInstagram",
                table: "OrgTable",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<byte[]>(
                name: "OrgHeader",
                table: "OrgTable",
                type: "image",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "image");

            migrationBuilder.AddColumn<int>(
                name: "ControlNumber",
                table: "OrgTable",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrgID",
                table: "CollegeTable",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "OrganizationName",
                table: "CollegeTable",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_CollegeTable_OrgID",
                table: "CollegeTable",
                column: "OrgID");

            migrationBuilder.AddForeignKey(
                name: "FK_CollegeTable_OrgTable",
                table: "CollegeTable",
                column: "OrgID",
                principalTable: "OrgTable",
                principalColumn: "OrgID");
        }
    }
}
