using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Model.Resume;
using TuyenDungAPI.Model.Company;


namespace TuyenDungAPI.Service
{
    public class ResumeService
    {
        private readonly DataContext _dbContext;

        public ResumeService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ApiResponse<PagedResult<ResumeResponse>>> GetAllResumesAsync(ResumeQueryParameters query)
        {
            var resumesQuery = _dbContext.Resumes
                .Include(r => r.Company) // Join với bảng Company
                .Include(r => r.Job) // Join với bảng Job
                .Where(r => !r.IsDeleted); // Lọc các Resume chưa xóa

            resumesQuery = resumesQuery.OrderByDescending(r => r.CreatedAt);
            // Lọc theo Email
            if (!string.IsNullOrWhiteSpace(query.Email))
                resumesQuery = resumesQuery.Where(r => r.Email.Contains(query.Email));

            // Lọc theo Status
            if (!string.IsNullOrWhiteSpace(query.Status))
                resumesQuery = resumesQuery.Where(r => r.Status == query.Status);

            // Lọc theo CompanyId
            if (query.CompanyId.HasValue)
                resumesQuery = resumesQuery.Where(r => r.CompanyId == query.CompanyId);

            // Lọc theo JobId
            if (query.JobId.HasValue)
                resumesQuery = resumesQuery.Where(r => r.JobId == query.JobId);

            // Phân trang
            var totalRecords = await resumesQuery.CountAsync();
            var resumes = await resumesQuery
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            // Kiểm tra nếu không có Resume nào
            if (!resumes.Any())
            {
                // Nếu không có Resume, trả về thông báo với danh sách rỗng
                var emptyResponse = new PagedResult<ResumeResponse>
                {
                    CurrentPage = query.PageNumber,
                    PageSize = query.PageSize,
                    TotalRecords = 0, // Không có bản ghi nào
                    Items = new List<ResumeResponse>(), // Danh sách rỗng
                };
                return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, emptyResponse, "Không có resume nào trong hệ thống!");
            }

            // Tạo kết quả phân trang
            var response = new PagedResult<ResumeResponse>
            {
                CurrentPage = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalRecords,
                Items = resumes.Select(r => new ResumeResponse
                {
                    Id = r.Id,
                    Email = r.Email,
                    UserId = r.UserId,
                    Status = r.Status,
                    Company = new CompanyResumeResponse
                    {
                        Id = r.CompanyId,
                        Name = r.Company.Name
                    },
                    Job = new JobResponse
                    {
                        Id = r.JobId,
                        Name = r.Job.Name
                    },
                    History = r.History,
                    Files = r.Files.Select(f => new ResumeFileResponse
                    {
                        Id = f.Id,
                        FileUrl = f.FileUrl,
                        FileType = f.FileType,
                        FileSize = f.FileSize,
                        CreatedAt = f.CreatedAt,
                        CreatedBy = f.CreatedBy
                    }).ToList()
                }).ToList()
            };

            return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, response, "Lấy danh sách Resume thành công!");
        }

        public async Task<ApiResponse<PagedResult<ResumeResponse>>> GetAllResumesByUserIdAsync(Guid userId, ResumeQueryParameters query)
        {
            var resumesQuery = _dbContext.Resumes
                .Include(r => r.Company) // Join với bảng Company
                .Include(r => r.Job) // Join với bảng Job
                .Where(r => r.UserId == userId && !r.IsDeleted); // Lọc theo UserId và chưa xóa
            resumesQuery = resumesQuery.OrderByDescending(r => r.CreatedAt);

            // Lọc theo Email
            if (!string.IsNullOrWhiteSpace(query.Email))
                resumesQuery = resumesQuery.Where(r => r.Email.Contains(query.Email));

            // Lọc theo Status
            if (!string.IsNullOrWhiteSpace(query.Status))
                resumesQuery = resumesQuery.Where(r => r.Status == query.Status);

            // Lọc theo CompanyId
            if (query.CompanyId.HasValue)
                resumesQuery = resumesQuery.Where(r => r.CompanyId == query.CompanyId);

            // Lọc theo JobId
            if (query.JobId.HasValue)
                resumesQuery = resumesQuery.Where(r => r.JobId == query.JobId);

            // Phân trang
            var totalRecords = await resumesQuery.CountAsync();
            var resumes = await resumesQuery
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            // Tạo kết quả phân trang
            var response = new PagedResult<ResumeResponse>
            {
                CurrentPage = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalRecords,
                Items = resumes.Select(r => new ResumeResponse
                {
                    Id = r.Id,
                    Email = r.Email,
                    UserId = r.UserId,
                    Status = r.Status,
                    Company = new CompanyResumeResponse
                    {
                        Id = r.CompanyId,
                        Name = r.Company.Name
                    },
                    Job = new JobResponse
                    {
                        Id = r.JobId,
                        Name = r.Job.Name
                    },
                    History = r.History,
                    Files = r.Files.Select(f => new ResumeFileResponse
                    {
                        Id = f.Id,
                        FileUrl = f.FileUrl,
                        FileType = f.FileType,
                        FileSize = f.FileSize,
                        CreatedAt = f.CreatedAt,
                        CreatedBy = f.CreatedBy
                    }).ToList()
                }).ToList()
            };

            return new ApiResponse<PagedResult<ResumeResponse>>(true, 200, response, "Lấy danh sách Resume của User thành công!");
        }

        /// <summary>
        /// Tạo mới Resume cho người dùng.
        /// </summary>
        /// <param name="request">Thông tin Resume cần tạo</param>
        /// <returns>Thông tin Resume đã tạo</returns>
        public async Task<ApiResponse<ResumeResponse>> CreateResumeAsync(CreateResumeRequest request)
        {
            // Kiểm tra nếu File URL có hợp lệ
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Files?.FirstOrDefault().ToString()))
            {
                return new ApiResponse<ResumeResponse>(false, 400, null, "Email hoặc URL file không hợp lệ.");
            }

            // Tạo Resume mới
            var resume = new Resume
            {
                Email = request.Email,
                UserId = request.UserId,
                Status = "PENDING",
                CompanyId = request.CompanyId,
                JobId = request.JobId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "System", // Hoặc từ User của bạn
            };

            // Tạo History với trạng thái PENDING
            var history = new ResumeHistory
            {
                Status = "PENDING",
                UpdatedAt = DateTime.UtcNow,
                UpdatedBy = new ResumeHistory.ResumeUpdatedBy
                {
                    _id = request.UserId,
                    Email = request.Email
                }
            };
            resume.History.Add(history);

            // Xử lý các file upload
            if (request.Files != null && request.Files.Count > 0)
            {
                foreach (var fileId in request.Files)
                {
                    var file = await _dbContext.ResumeFiles.FindAsync(fileId);
                    if (file != null)
                    {
                        // Liên kết file với Resume
                        resume.Files.Add(file);
                    }
                }
            }

            // Thêm Resume vào DbContext
            _dbContext.Resumes.Add(resume);
            await _dbContext.SaveChangesAsync();

            // Trả về thông tin Resume đã tạo
            var response = new ResumeResponse
            {
                Id = resume.Id,
                Email = resume.Email,
                UserId = resume.UserId,
                Status = resume.Status,
                Company = new CompanyResumeResponse
                {
                    Id = resume.CompanyId,
                    Name = resume.Company.Name
                },
                Job = new JobResponse
                {
                    Id = resume.JobId,
                    Name = resume.Job.Name
                },
                History = resume.History,
                Files = resume.Files.Select(f => new ResumeFileResponse
                {
                    Id = f.Id,
                    FileUrl = f.FileUrl,
                    FileType = f.FileType,
                    FileSize = f.FileSize,
                    CreatedAt = f.CreatedAt,
                    CreatedBy = f.CreatedBy
                }).ToList()
            };

            return new ApiResponse<ResumeResponse>(true, 200, response, "Tạo Resume thành công!");
        }
    }

}

