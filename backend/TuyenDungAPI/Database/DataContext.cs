using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model;
using TuyenDungAPI.Model.ActivityLog;
using TuyenDungAPI.Model.Authentication;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.Job;
using TuyenDungAPI.Model.Resume;
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
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<ResumeHistory> ResumeHistories { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mối quan hệ UserRole
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

            // Mối quan hệ Resume và Job
            modelBuilder.Entity<Resume>()
                .HasOne(r => r.Job)
                .WithMany()
                .HasForeignKey(r => r.JobId)
                .OnDelete(DeleteBehavior.Restrict);

            // Mối quan hệ Resume và Company
            modelBuilder.Entity<Resume>()
                .HasOne(r => r.Company)
                .WithMany()
                .HasForeignKey(r => r.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Mối quan hệ giữa Resume và ResumeHistory
            modelBuilder.Entity<ResumeHistory>()
                .HasOne(rh => rh.Resume)
                .WithMany(r => r.History)  // Một Resume có nhiều ResumeHistory
                .HasForeignKey(rh => rh.ResumeId)
                .OnDelete(DeleteBehavior.Cascade);  // Khi xóa Resume, các bản ghi ResumeHistory cũng sẽ bị xóa
        }


    }
}
