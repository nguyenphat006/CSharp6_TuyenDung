using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Model;
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
        public DbSet<ResumeFile> ResumeFiles { get; set; }

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

            modelBuilder.Entity<ResumeFile>()
      .HasOne(rf => rf.Resume)
      .WithMany(r => r.Files)
      .HasForeignKey(rf => rf.ResumeId);

            // 👉 Cấu hình Resume.History là Owned Collection
            modelBuilder.Entity<Resume>()
                .OwnsMany(r => r.History, historyBuilder =>
                {
                    historyBuilder.WithOwner().HasForeignKey("ResumeId");
                    historyBuilder.Property<int>("Id"); // EF yêu cầu khóa
                    historyBuilder.HasKey("Id");

                    // 👉 Cấu hình tiếp ResumeHistory.UpdatedBy là Owned Entity
                    historyBuilder.OwnsOne(h => h.UpdatedBy, updatedByBuilder =>
                    {
                        updatedByBuilder.Property(x => x._id).HasColumnName("UpdatedBy_Id");
                        updatedByBuilder.Property(x => x.Email).HasColumnName("UpdatedBy_Email");
                    });
                });
        }
    }
}
