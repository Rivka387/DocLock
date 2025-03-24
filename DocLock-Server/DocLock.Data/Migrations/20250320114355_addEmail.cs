using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DocLock.Data.Migrations
{
    /// <inheritdoc />
    public partial class addEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string[]>(
                name: "EmailAloowed",
                table: "_Files",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "_Files",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailAloowed",
                table: "_Files");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "_Files");
        }
    }
}
