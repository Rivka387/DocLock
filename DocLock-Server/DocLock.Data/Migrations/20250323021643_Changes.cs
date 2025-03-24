using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DocLock.Data.Migrations
{
    /// <inheritdoc />
    public partial class Changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EncryptedFileLink",
                table: "_Files",
                newName: "EncryptedLink");

            migrationBuilder.AddColumn<DateOnly>(
                name: "UpdateAt",
                table: "_Files",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdateAt",
                table: "_Files");

            migrationBuilder.RenameColumn(
                name: "EncryptedLink",
                table: "_Files",
                newName: "EncryptedFileLink");
        }
    }
}
