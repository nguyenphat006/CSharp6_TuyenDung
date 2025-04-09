using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.Resume;
using TuyenDungAPI.Model.Company;
using System.Security.Claims;


namespace TuyenDungAPI.Service
{
    public class ResumeService
    {
        private readonly DataContext _dbContext;

        public ResumeService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ApiResponse<ResumeResponse>> UploadResumeFileAsync(Guid resumeId, IFormFile file, ClaimsPrincipal currentUser)
        {
            var resume = await _dbContext.Resumes
                .Include(r => r.Company)
                .Include(r => r.Job)
                .Include(r => r.History)
                .FirstOrDefaultAsync(r => !r.IsDeleted && r.Id == resumeId);

            if (resume == null)
            {
                return new ApiResponse<ResumeResponse>(false, 404, null, "Không tìm thấy đơn ứng tuyển");
            }

            var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
            {
                return new ApiResponse<ResumeResponse>(false, 400, null, "Chỉ cho phép file .pdf, .doc, .docx");
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return new ApiResponse<ResumeResponse>(false, 400, null, "Kích thước file không được vượt quá 5MB");
            }

            try
            {
                var uniqueFileName = $"{Guid.NewGuid()}{extension}";
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "resume");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                string fileUrl = $"/uploads/resume/{uniqueFileName}";

                resume.FileUrl = fileUrl;
                resume.UpdatedAt = DateTime.UtcNow;
                resume.UpdatedBy = currentUser?.Identity?.Name ?? "System";

                await _dbContext.SaveChangesAsync();

                var response = new ResumeResponse
                {
                    Id = resume.Id,
                    Email = resume.Email,
                    UserId = resume.UserId,
                    Status = resume.Status,
                    FileUrl = resume.FileUrl,
                    CreatedAt = resume.CreatedAt,
                    IsActive = resume.IsActive,
                    IsDeleted = resume.IsDeleted,
                    CreatedBy = resume.CreatedBy,
                    DeletedBy = resume.DeletedBy,
                    UpdatedAt = resume.UpdatedAt,
                    UpdatedBy = resume.UpdatedBy,
                    Company = new CompanyResumeResponse
                    {
                        Id = resume.Company.Id,
                        Name = resume.Company.Name
                    },
                    Job = new JobResponse
                    {
                        Id = resume.Job.Id,
                        Name = resume.Job.Name
                    },
                    History = resume.History
                };

                return new ApiResponse<ResumeResponse>(true, 200, response, "Upload CV thành công!");
            }
            catch (Exception ex)
            {
                return new ApiResponse<ResumeResponse>(false, 500, null, $"Lỗi khi upload file: {ex.Message}");
            }
        }



        //public async Task<ApiResponse<PagedResult<ResumeResponse>>> GetAllResumesAsync(ResumeQueryParameters query)
        //{
        //    var resumesQuery = _dbContext.Resumes
        //        .Include(r => r.Company) // Join với bảng Company
        //        .Include(r => r.Job) // Join với bảng Job
        //        .Where(r => !r.IsDeleted); // Lọc các Resume chưa xóa

        //    resumesQuery = resumesQuery.OrderByDescending(r => r.CreatedAt);
        //    // Lọc theo Email
        //    if (!string.IsNullOrWhiteSpace(query.Email))
        //        resumesQuery = resumesQuery.Where(r => r.Email.Contains(query.Email));

        //    // Lọc theo Status
        //    if (!string.IsNullOrWhiteSpace(query.Status))
        //        resumesQuery = resumesQuery.Where(r => r.Status == query.Status);

        //    // Lọc theo CompanyId
        //    if (query.CompanyId.HasValue)
        //        resumesQuery = resumesQuery.Where(r => r.CompanyId == query.CompanyId);

        //    // Lọc theo JobId
        //    if (query.JobId.HasValue)
        //        resumesQuery = resumesQuery.Where(r => r.JobId == query.JobId);

        //    // Phân trang
        //    var totalRecords = await resumesQuery.CountAsync();
        //    var resumes = await resumesQuery
        //        .Skip((query.PageNumber - 1) * query.PageSize)
        //        .Take(query.PageSize)
        //        .ToListAsync();

        //    // Kiểm tra nếu không có Resume nào
        //    if (!resumes.Any())
        //    {
        //        // Nếu không có Resume, trả về thông báo với danh sách rỗng
        //        var emptyResponse = new PagedResult<ResumeResponse>
        //        {
        //            CurrentPage = query.PageNumber,
        //            PageSize = query.PageSize,
        //            TotalRecords = 0, // Không có bản ghi nào
        //            Items = new List<ResumeResponse>(), // Danh sách rỗng
        //        };
        //        return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, emptyResponse, "Không có resume nào trong hệ thống!");
        //    }

        //    // Tạo kết quả phân trang
        //    var response = new PagedResult<ResumeResponse>
        //    {
        //        CurrentPage = query.PageNumber,
        //        PageSize = query.PageSize,
        //        TotalRecords = totalRecords,
        //        Items = resumes.Select(r => new ResumeResponse
        //        {
        //            Id = r.Id,
        //            Email = r.Email,
        //            UserId = r.UserId,
        //            Status = r.Status,
        //            Company = new CompanyResumeResponse
        //            {
        //                Id = r.CompanyId,
        //                Name = r.Company.Name
        //            },
        //            Job = new JobResponse
        //            {
        //                Id = r.JobId,
        //                Name = r.Job.Name
        //            },
        //            History = r.History,
        //            Files = r.Files.Select(f => new ResumeFileResponse
        //            {
        //                Id = f.Id,
        //                FileUrl = f.FileUrl,
        //                FileType = f.FileType,
        //                FileSize = f.FileSize,
        //                CreatedAt = f.CreatedAt,
        //                CreatedBy = f.CreatedBy
        //            }).ToList()
        //        }).ToList()
        //    };

        //    return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, response, "Lấy danh sách Resume thành công!");
        //}

        //public async Task<ApiResponse<PagedResult<ResumeResponse>>> GetAllResumesByUserIdAsync(Guid userId, ResumeQueryParameters query)
        //{
        //    var resumesQuery = _dbContext.Resumes
        //        .Include(r => r.Company) // Join với bảng Company
        //        .Include(r => r.Job) // Join với bảng Job
        //        .Where(r => r.UserId == userId && !r.IsDeleted); // Lọc theo UserId và chưa xóa
        //    resumesQuery = resumesQuery.OrderByDescending(r => r.CreatedAt);

        //    // Lọc theo Email
        //    if (!string.IsNullOrWhiteSpace(query.Email))
        //        resumesQuery = resumesQuery.Where(r => r.Email.Contains(query.Email));

        //    // Lọc theo Status
        //    if (!string.IsNullOrWhiteSpace(query.Status))
        //        resumesQuery = resumesQuery.Where(r => r.Status == query.Status);

        //    // Lọc theo CompanyId
        //    if (query.CompanyId.HasValue)
        //        resumesQuery = resumesQuery.Where(r => r.CompanyId == query.CompanyId);

        //    // Lọc theo JobId
        //    if (query.JobId.HasValue)
        //        resumesQuery = resumesQuery.Where(r => r.JobId == query.JobId);

        //    // Phân trang
        //    var totalRecords = await resumesQuery.CountAsync();
        //    var resumes = await resumesQuery
        //        .Skip((query.PageNumber - 1) * query.PageSize)
        //        .Take(query.PageSize)
        //        .ToListAsync();

        //    // Tạo kết quả phân trang
        //    var response = new PagedResult<ResumeResponse>
        //    {
        //        CurrentPage = query.PageNumber,
        //        PageSize = query.PageSize,
        //        TotalRecords = totalRecords,
        //        Items = resumes.Select(r => new ResumeResponse
        //        {
        //            Id = r.Id,
        //            Email = r.Email,
        //            UserId = r.UserId,
        //            Status = r.Status,
        //            Company = new CompanyResumeResponse
        //            {
        //                Id = r.CompanyId,
        //                Name = r.Company.Name
        //            },
        //            Job = new JobResponse
        //            {
        //                Id = r.JobId,
        //                Name = r.Job.Name
        //            },
        //            History = r.History,
        //            Files = r.Files.Select(f => new ResumeFileResponse
        //            {
        //                Id = f.Id,
        //                FileUrl = f.FileUrl,
        //                FileType = f.FileType,
        //                FileSize = f.FileSize,
        //                CreatedAt = f.CreatedAt,
        //                CreatedBy = f.CreatedBy
        //            }).ToList()
        //        }).ToList()
        //    };

        //    return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, response, "Lấy danh sách Resume của User thành công!");
        //}


    }

}

