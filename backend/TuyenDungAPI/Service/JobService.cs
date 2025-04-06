using System.ComponentModel.Design;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.Job;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Service
{
    public class JobService
    {
        private readonly DataContext _dbContext;

        public JobService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ApiResponse<PagedResult<JobResponse>>> GetAllJobsAsync(JobQueryParameters query)
        {
            var jobsQuery = _dbContext.Jobs
                .Include(j => j.Company) // 🔥 Join luôn bảng Company
                .Where(j => !j.IsDeleted)
                .AsQueryable();

            // Filtering
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                jobsQuery = jobsQuery.Where(j => j.Name.Contains(query.Keyword) || j.Description.Contains(query.Keyword));
            }

            if (!string.IsNullOrWhiteSpace(query.Level))
            {
                jobsQuery = jobsQuery.Where(j => j.Level == query.Level);
            }

            if (!string.IsNullOrWhiteSpace(query.Location))
            {
                jobsQuery = jobsQuery.Where(j => j.Location.Contains(query.Location));
            }

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                jobsQuery = jobsQuery.Where(j => j.Company.Name.Contains(query.CompanyName)); // 🔥 Đổi chỗ này
            }

            if (query.MinSalary.HasValue)
            {
                jobsQuery = jobsQuery.Where(j => j.Salary >= query.MinSalary.Value);
            }

            if (query.MaxSalary.HasValue)
            {
                jobsQuery = jobsQuery.Where(j => j.Salary <= query.MaxSalary.Value);
            }

            if (query.IsActive.HasValue)
            {
                jobsQuery = jobsQuery.Where(j => j.IsActive == query.IsActive.Value);
            }

            // Pagination
            var totalRecords = await jobsQuery.CountAsync();

            var jobs = await jobsQuery
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            var response = new PagedResult<JobResponse>
            {
                CurrentPage = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalRecords,
                Items = jobs.Select(j => new JobResponse(j)).ToList()
            };

            if (!response.Items.Any())
            {
                return new ApiResponse<PagedResult<JobResponse>>(true, 200, response, "Không có job nào trong hệ thống!");
            }

            return new ApiResponse<PagedResult<JobResponse>>(true, 200, response, "Lấy danh sách job thành công");
        }
        public async Task<ApiResponse<JobResponse>> GetJobByIdAsync(Guid id)
        {
            var job = await _dbContext.Jobs
                .Where(j => j.Id == id && !j.IsDeleted && j.IsActive)
                .FirstOrDefaultAsync();

            if (job == null)
            {
                return new ApiResponse<JobResponse>(false, 404, null, "Không tìm thấy công việc với ID đã cho hoặc công việc đã bị khóa.");
            }

            var response = new JobResponse(job);

            return new ApiResponse<JobResponse>(true, 200, response, "Lấy thông tin công việc thành công.");
        }
        public async Task<ApiResponse<JobResponse>> CreateJobAsync(CreateJobRequest request, ClaimsPrincipal currentUser)
        {
            string createdBy = currentUser?.Identity?.Name ?? "System";

            // Kiểm tra tên công việc đã tồn tại chưa
            if (await _dbContext.Jobs
                .AnyAsync(j => j.Name.ToLower() == request.Name.ToLower() && !j.IsDeleted))
            {
                return new ApiResponse<JobResponse>(false, 400, null, "Công việc này đã tồn tại trong hệ thống!");
            }

            // Kiểm tra CompanyId có tồn tại không
            var company = await _dbContext.Company
                .FirstOrDefaultAsync(c => c.Id == request.CompanyId && !c.IsDeleted);

            if (company == null)
            {
                return new ApiResponse<JobResponse>(false, 404, null, "Không tìm thấy công ty với ID đã nhập.");
            }                           

            var job = new Job
            {
                CompanyId = request.CompanyId,
                Name = request.Name,
                Skills = string.Join(", ", request.Skills),
                Location = request.Location,
                Salary = request.Salary,
                Quantity = request.Quantity,
                Level = request.Level,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = createdBy,
            };

            try
            {
                _dbContext.Jobs.Add(job);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new ApiResponse<JobResponse>(false, 500, null, $"Lỗi khi lưu công việc: {ex.Message}");
            }

            var response = new JobResponse(job);
            return new ApiResponse<JobResponse>(true, 201, response, "Tạo công việc thành công!");
        }
        public async Task<ApiResponse<JobResponse>> UpdateJobAsync(Guid id, UpdateJobRequest request, ClaimsPrincipal currentUser)
        {
            string updatedBy = currentUser?.Identity?.Name ?? "System";

            // Tìm công việc theo ID
            var job = await _dbContext.Jobs.FirstOrDefaultAsync(j => j.Id == id && !j.IsDeleted);

            if (job == null)
            {
                return new ApiResponse<JobResponse>(false, 404, null, "Không tìm thấy công việc với ID đã cho.");
            }

            // Cập nhật thông tin
            job.Name = request.Name;
            job.Skills = string.Join(", ", request.Skills); // Gộp list skill thành chuỗi
            job.Location = request.Location;
            job.Salary = request.Salary;
            job.Quantity = request.Quantity;
            job.Level = request.Level;
            job.CompanyId = request.CompanyId;
            job.Description = request.Description;
            job.StartDate = request.StartDate;
            job.EndDate = request.EndDate;
            job.UpdatedAt = DateTime.UtcNow;
            job.UpdatedBy = updatedBy;
            job.IsActive = request.IsActive;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new ApiResponse<JobResponse>(false, 500, null, $"Lỗi khi cập nhật công việc: {ex.Message}");
            }

            var response = new JobResponse(job);
            return new ApiResponse<JobResponse>(true, 200, response, "Cập nhật công việc thành công!");
        }
        public async Task<ApiResponse<string>> DeleteJobsAsync(DeleteJobRequest request, ClaimsPrincipal currentUser)
        {
            string deletedBy = currentUser?.Identity?.Name ?? "System";

            var jobs = await _dbContext.Jobs
                .Where(j => request.JobIds.Contains(j.Id) && !j.IsDeleted)
                .ToListAsync();

            if (!jobs.Any())
            {
                return new ApiResponse<string>(false, 404, null, "Không tìm thấy công việc nào phù hợp để xóa.");
            }

            foreach (var job in jobs)
            {
                job.IsDeleted = true;
                job.DeletedBy = deletedBy;
            }

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(false, 500, null, $"Lỗi khi xóa công việc: {ex.Message}");
            }

            return new ApiResponse<string>(true, 200, null, $"Đã xóa thành công {jobs.Count} công việc.");
        }
        public async Task<ApiResponse<List<JobResponse>>> GetJobsByCompanyAsync(Guid companyId)
        {
            var jobs = await _dbContext.Jobs
                .Where(j => j.CompanyId == companyId && !j.IsDeleted && j.IsActive)
                .Select(j => new JobResponse(j))
                .ToListAsync();

            if (!jobs.Any())
            {
                return new ApiResponse<List<JobResponse>>(true, 200, jobs, "Không có công việc nào cho công ty này.");
            }

            return new ApiResponse<List<JobResponse>>(true, 200, jobs, "Lấy danh sách công việc theo công ty thành công.");
        }



    }
}
