using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.Resume;
using TuyenDungAPI.Model.Company;
using System.Security.Claims;
using Org.BouncyCastle.Utilities.Collections;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using TuyenDungAPI.Model.Job;
using Microsoft.AspNetCore.Http.HttpResults;


namespace TuyenDungAPI.Service
{
    public class ResumeService
    {
        private readonly DataContext _dbContext;
        private readonly ActivityLogService _activityLogService;
        public ResumeService(DataContext dbContext, ActivityLogService activityLogService)
        {
            _dbContext = dbContext;
            _activityLogService = activityLogService;
        }

        public async Task<ApiResponse<ResumeResponse>> CreateResumeAsync(CreateResumeRequest request, ClaimsPrincipal currentUser)
        {
            string email = currentUser.FindFirstValue(ClaimTypes.Email);
            string userIdStr = currentUser.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return new ApiResponse<ResumeResponse>(false, 401, null, "Token không hợp lệ hoặc thiếu UserId!");
            }

            // 🔍 Check company tồn tại
            var company = await _dbContext.Company.FindAsync(request.CompanyId);
            if (company == null || company.IsDeleted)
            {
                return new ApiResponse<ResumeResponse>(false, 404, null, "Công ty không tồn tại!");
            }

            // 🔍 Check job tồn tại
            var job = await _dbContext.Jobs.FindAsync(request.JobId);
            if (job == null || job.IsDeleted)
            {
                return new ApiResponse<ResumeResponse>(false, 404, null, "Công việc không tồn tại!");
            }

            // 🔁 Check đã ứng tuyển chưa
            bool exists = await _dbContext.Resumes.AnyAsync(r =>
                r.UserId == userId && r.JobId == request.JobId && !r.IsDeleted);

            if (exists)
            {
                return new ApiResponse<ResumeResponse>(false, 409, null, "Bạn đã ứng tuyển công việc này rồi!");
            }

            // ✅ Validate file
            var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
            var ext = Path.GetExtension(request.File.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(ext))
                return new ApiResponse<ResumeResponse>(false, 400, null, "Chỉ chấp nhận file PDF, DOC, DOCX");

            if (request.File.Length > 5 * 1024 * 1024)
                return new ApiResponse<ResumeResponse>(false, 400, null, "File không được vượt quá 5MB");

            // ✅ Upload file
            string uniqueFileName = $"{Guid.NewGuid()}{ext}";
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "resume");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            string filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(fileStream);
            }

            string fileUrl = $"/uploads/resume/{uniqueFileName}";

            // ✅ Tạo mới Resume
            var resume = new Resume
            {
                Email = email ?? "NULL",
                UserId = userId,
                CompanyId = request.CompanyId,
                JobId = request.JobId,
                Status = "PENDING",
                FileUrl = fileUrl,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = currentUser?.Identity?.Name ?? "System"
            };

            _dbContext.Resumes.Add(resume);
            await _dbContext.SaveChangesAsync();

            await _activityLogService.LogActivityAsync(
                action: "SUBMIT_RESUME",
                description: $"Ứng viên {email} đã ứng tuyển job '{job.Name}'",
                userName: currentUser.Identity?.Name,
                userId: userId,
                targetType: "Resume",
                targetId: resume.Id
            );

            // ✅ Tạo lịch sử
            var history = new ResumeHistory
            {
                ResumeId = resume.Id,
                Status = "PENDING",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = currentUser?.Identity?.Name ?? "System"
            };

            _dbContext.ResumeHistories.Add(history);
            await _dbContext.SaveChangesAsync();

            // ✅ Tạo response
            var response = new ResumeResponse
            {
                Id = resume.Id,
                Email = resume.Email,
                Status = resume.Status,
                FileUrl = resume.FileUrl,
                CreatedAt = resume.CreatedAt,
                Company = new CompanyResumeResponse { Id = company.Id, Name = company.Name },
                Job = new JobResumeResponse { Id = job.Id, Name = job.Name },
                History = new List<ResumeHistoryResponse> { new ResumeHistoryResponse(history) }
            };

            return new ApiResponse<ResumeResponse>(true, 201, response, "Nộp đơn ứng tuyển thành công!");
        }
        public async Task<ApiResponse<PagedResult<ResumeResponse>>> GetAllResumesAsync(ResumeQueryParameters parameters)
        {
            var query = _dbContext.Resumes
                .Where(r => r.IsActive && !r.IsDeleted)
                .AsQueryable();

            // 🔎 Apply lọc
            if (!string.IsNullOrEmpty(parameters.Email))
            {
                query = query.Where(r => r.Email.Contains(parameters.Email));
            }

            if (!string.IsNullOrEmpty(parameters.Status))
            {
                query = query.Where(r => r.Status == parameters.Status);
            }

            if (parameters.CompanyId.HasValue)
            {
                query = query.Where(r => r.CompanyId == parameters.CompanyId.Value);
            }

            if (parameters.JobId.HasValue)
            {
                query = query.Where(r => r.JobId == parameters.JobId.Value);
            }

            // 🔎 Tổng số bản ghi
            var totalRecords = await query.CountAsync();

            // 📄 Phân trang
            var resumes = await query
                .OrderByDescending(r => r.CreatedAt) // Mới nhất trước
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Include(r => r.Company)
                .Include(r => r.Job)
                .Include(r => r.User)
                .Include(r => r.History)
                .ToListAsync();

            var response = resumes.Select(r => new ResumeResponse
            {
                Id = r.Id,
                Email = r.Email,
                Status = r.Status,
                FileUrl = r.FileUrl,
                CreatedAt = r.CreatedAt,
                CreatedBy = r.CreatedBy,
                UpdatedAt = r.UpdatedAt,
                UpdatedBy = r.UpdatedBy,
                User = new UserResponse
                {
                    Id = r.User.Id,
                    Name = r.User.Name
                },
                Company = new CompanyResumeResponse
                {
                    Id = r.Company.Id,
                    Name = r.Company.Name,
                    Address = r.Company.Address
                },
                Job = new JobResumeResponse
                {
                    Id = r.Job.Id,
                    Name = r.Job.Name,
                    Salary = r.Job.Salary
                },
                History = r.History
                .OrderByDescending(h => h.CreatedAt)
                .Select(h => new ResumeHistoryResponse(h))
                .ToList()
             }).ToList();


            var pagedResult = new PagedResult<ResumeResponse>
            {
                Items = response,
                TotalRecords = totalRecords,
                CurrentPage = parameters.PageNumber,
                PageSize = parameters.PageSize
            };

            return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, pagedResult, "Lấy danh sách đơn ứng tuyển thành công!");
        }
        public async Task<ApiResponse<ResumeResponse>> GetResumeByIdAsync(Guid id)
        {
            var resume = await _dbContext.Resumes
                .Include(r => r.Company)
                .Include(r => r.Job)
                .Include(r => r.History)
                .Include(r => r.User)
                .Where(r => r.Id == id && r.IsActive && !r.IsDeleted)
                .FirstOrDefaultAsync();

            if (resume == null)
            {
                return new ApiResponse<ResumeResponse>(false, 404, null, "Đơn ứng tuyển không tồn tại!");
            }

            var response = new ResumeResponse
            {
                Id = resume.Id,
                Email = resume.Email,
                Status = resume.Status,
                FileUrl = resume.FileUrl,
                CreatedAt = resume.CreatedAt,
                User = new UserResponse
                {
                    Id = resume.User.Id,
                    Name = resume.User.Name
                },
                Company = new CompanyResumeResponse
                {
                    Id = resume.Company.Id,
                    Name = resume.Company.Name
                },
                Job = new JobResumeResponse
                {
                    Id = resume.Job.Id,
                    Name = resume.Job.Name
                },
                History = resume.History.OrderByDescending(h => h.CreatedAt).Select(h => new ResumeHistoryResponse(h)).ToList()
            };

            return new ApiResponse<ResumeResponse>(true, 200, response, "Lấy đơn ứng tuyển thành công!");
        }
        public async Task<ApiResponse<ResumeResponse>> ChangeResumeStatusAsync(Guid resumeId, UpdateStatusResumeRequest request, ClaimsPrincipal currentUser)
        {
            string updatedBy = currentUser?.Identity?.Name ?? "System";

            var resume = await _dbContext.Resumes
                .Include(r => r.Company)
                .Include(r => r.Job)
                .Include(r => r.History)
                .FirstOrDefaultAsync(r => r.Id == resumeId && r.IsActive && !r.IsDeleted);

            if (resume == null)
            {
                return new ApiResponse<ResumeResponse>(false, 404, null, "Đơn ứng tuyển không tồn tại!");
            }

            // 🚀 Cập nhật trạng thái mới
            resume.Status = request.Status;
            resume.UpdatedAt = DateTime.UtcNow;
            resume.UpdatedBy = updatedBy;

            _dbContext.Resumes.Update(resume);

            // 🚀 Ghi thêm lịch sử mới
            var history = new ResumeHistory
            {
                ResumeId = resume.Id,
                Status = request.Status,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = updatedBy
            };

            _dbContext.ResumeHistories.Add(history);
            await _dbContext.SaveChangesAsync();

            await _activityLogService.LogActivityAsync(
            action: "UPDATE_RESUME_STATUS",
            description: $"Cập nhật trạng thái đơn ứng tuyển '{resume.Email}' thành '{request.Status}' cho job '{resume.Job.Name}'",
            userName: updatedBy,
            userId: Guid.TryParse(currentUser.FindFirstValue(ClaimTypes.NameIdentifier), out var uid) ? uid : null,
            targetType: "Resume",
            targetId: resume.Id
        );

            // Nếu status là APPROVED, log riêng luôn:
            if (request.Status.ToUpper() == "APPROVED")
            {
                await _activityLogService.LogActivityAsync(
                    action: "APPROVE_RESUME",
                    description: $"CV của {resume.Email} đã được duyệt cho job '{resume.Job.Name}'",
                    userName: updatedBy,
                    userId: Guid.TryParse(currentUser.FindFirstValue(ClaimTypes.NameIdentifier), out var uid2) ? uid2 : null,
                    targetType: "Resume",
                    targetId: resume.Id
                );
            }


            // 🚀 Chuẩn bị response
            var response = new ResumeResponse
            {
                Id = resume.Id,
                Email = resume.Email,
                Status = resume.Status,
                FileUrl = resume.FileUrl,
                CreatedAt = resume.CreatedAt,
                Company = new CompanyResumeResponse { Id = resume.Company.Id, Name = resume.Company.Name },
                Job = new JobResumeResponse { Id = resume.Job.Id, Name = resume.Job.Name },
                History = resume.History.OrderByDescending(h => h.CreatedAt).Select(h => new ResumeHistoryResponse(h)).ToList()
            };

            return new ApiResponse<ResumeResponse>(true, 200, response, "Cập nhật trạng thái đơn ứng tuyển thành công!");
        }
        public async Task<ApiResponse<string>> DeleteResumesAsync(DeleteResumeRequest request, ClaimsPrincipal currentUser)
        {
            if (request.ResumeIds == null || !request.ResumeIds.Any())
            {
                return new ApiResponse<string>(false, 400, null, "Danh sách ResumeId không được để trống!");
            }

            var deletedBy = currentUser?.Identity?.Name ?? "System";

            var resumes = await _dbContext.Resumes
                .Where(r => request.ResumeIds.Contains(r.Id) && r.IsActive && !r.IsDeleted)
                .ToListAsync();

            if (resumes == null || !resumes.Any())
            {
                return new ApiResponse<string>(false, 404, null, "Không tìm thấy đơn ứng tuyển nào để xoá!");
            }

            foreach (var resume in resumes)
            {
                resume.IsDeleted = true;
                resume.DeletedBy = deletedBy;
            }

            _dbContext.Resumes.UpdateRange(resumes);
            await _dbContext.SaveChangesAsync();

            return new ApiResponse<string>(true, 200, null, "Xoá đơn ứng tuyển thành công!");
        }
        public async Task<ApiResponse<List<ResumeResponse>>> GetResumesByUserAsync(ClaimsPrincipal currentUser)
        {
            var userIdStr = currentUser.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return new ApiResponse<List<ResumeResponse>>(false, 401, null, "Token không hợp lệ hoặc thiếu UserId!");
            }

            //var resumes = await _dbContext.Resumes
            //    .Where(r => r.UserId == userId && r.IsActive && !r.IsDeleted)
            //    .Include(r => r.Company)
            //    .Include(r => r.Job)
            //    .Include(r => r.User)
            //    .OrderByDescending(r => r.CreatedAt)  // 🆙 Mới nhất lên trước
            //    .ToListAsync();


            var resumes = await _dbContext.Resumes
              .Where(r =>
                  r.UserId == userId &&
                  r.IsActive && !r.IsDeleted &&
                  r.Company.IsActive && !r.Company.IsDeleted &&     // 🔍 Check công ty hợp lệ
                  r.Job.IsActive && !r.Job.IsDeleted                // 🔍 Check công việc hợp lệ
              )
              .Include(r => r.Company)
              .Include(r => r.Job)
              .Include(r => r.User)
              .OrderByDescending(r => r.CreatedAt)
              .ToListAsync();

            var response = resumes.Select(r => new ResumeResponse
            {
                Id = r.Id,
                Email = r.Email,
                Status = r.Status,
                FileUrl = r.FileUrl,
                CreatedAt = r.CreatedAt,
                User = new UserResponse
                {
                    Id = r.User.Id,
                    Name = r.User.Name
                },
                Company = new CompanyResumeResponse
                {
                    Id = r.Company.Id,
                    Name = r.Company.Name,
                    Address = r.Company.Address
                },
                Job = new JobResumeResponse
                {
                    Id = r.Job.Id,
                    Name = r.Job.Name,
                    Salary = r.Job.Salary
                },
            }).ToList();

            return new ApiResponse<List<ResumeResponse>>(true, 200, response, "Lấy tất cả đơn ứng tuyển theo người dùng thành công!");
        }









    }

}

