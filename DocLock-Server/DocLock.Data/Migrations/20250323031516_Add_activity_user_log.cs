using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DocLock.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_activity_user_log : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_UserActivityLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ActionType = table.Column<string>(type: "text", nullable: false),
                    FileId = table.Column<int>(type: "integer", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserActivityLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK__UserActivityLogs__Files_FileId",
                        column: x => x.FileId,
                        principalTable: "_Files",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__UserActivityLogs__Users_UserId",
                        column: x => x.UserId,
                        principalTable: "_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX__UserActivityLogs_FileId",
                table: "_UserActivityLogs",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX__UserActivityLogs_UserId",
                table: "_UserActivityLogs",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_UserActivityLogs");
        }
    }
}
