using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Billpop.Migrations
{
    public partial class InitialListingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: true),
                    About = table.Column<string>(maxLength: 300, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(6, 2)", nullable: false),
                    Currency = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SearchTagTypes",
                columns: table => new
                {
                    Name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    RelatedSearchTagTypeId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchTagTypes", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "SearchTags",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListingId = table.Column<int>(nullable: false),
                    SearchTagTypeId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SearchTags_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SearchTags_ListingId",
                table: "SearchTags",
                column: "ListingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SearchTags");

            migrationBuilder.DropTable(
                name: "SearchTagTypes");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
