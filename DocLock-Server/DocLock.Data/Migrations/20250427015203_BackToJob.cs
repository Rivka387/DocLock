using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DocLock.Data.Migrations
{
    /// <inheritdoc />
    public partial class BackToJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "_Files",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "_Files");
        }
    }
}
