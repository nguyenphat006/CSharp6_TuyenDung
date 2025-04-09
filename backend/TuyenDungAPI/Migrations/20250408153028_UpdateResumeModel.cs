using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TuyenDungAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateResumeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Resumes_CompanyId",
                table: "Resumes",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Resumes_JobId",
                table: "Resumes",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_Company_CompanyId",
                table: "Resumes",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_Jobs_JobId",
                table: "Resumes",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_Company_CompanyId",
                table: "Resumes");

            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_Jobs_JobId",
                table: "Resumes");

            migrationBuilder.DropIndex(
                name: "IX_Resumes_CompanyId",
                table: "Resumes");

            migrationBuilder.DropIndex(
                name: "IX_Resumes_JobId",
                table: "Resumes");
        }
    }
}
