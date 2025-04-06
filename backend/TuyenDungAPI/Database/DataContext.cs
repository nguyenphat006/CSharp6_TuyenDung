using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.Job;
using TuyenDungAPI.Model.User;

namespace TuyenDungAPI.Database
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<OtpVerification> OtpVerifications { get; set; } // ✅ Thêm bảng OTP
        public DbSet<Company> Company { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<CompanyJobs> CompanyJobs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<CompanyJobs>()
                .HasKey(cj => new { cj.CompanyId, cj.JobId });

            modelBuilder.Entity<CompanyJobs>()
                .HasOne(cj => cj.Company)
                .WithMany(c => c.CompanyJob)
                .HasForeignKey(cj => cj.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CompanyJobs>()
                .HasOne(cj => cj.Job)
                .WithMany(j => j.CompanyJob)
                .HasForeignKey(cj => cj.JobId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
