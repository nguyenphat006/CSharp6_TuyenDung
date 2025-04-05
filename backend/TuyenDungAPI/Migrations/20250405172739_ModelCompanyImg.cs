using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TuyenDungAPI.Migrations
{
    /// <inheritdoc />
    public partial class ModelCompanyImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Company",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Company");
        }
    }
}
