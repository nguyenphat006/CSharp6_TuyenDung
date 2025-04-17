using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.ActivityLog;
using TuyenDungAPI.Model.ModelBase;

namespace TuyenDungAPI.Service
{
    public class ActivityLogService
    {
        private readonly DataContext _dbContext;

        public ActivityLogService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task LogActivityAsync(string action, string? description, string? userName, Guid? userId = null, string? targetType = null, Guid? targetId = null)
        {
            var log = new ActivityLog
            {
                Action = action,
                Description = description,
                UserId = userId,
                UserName = userName,
                TargetType = targetType,
                TargetId = targetId,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.ActivityLogs.Add(log);
            await _dbContext.SaveChangesAsync();
        }



        public async Task<ApiResponse<PagedResult<ActivityLogResponse>>> GetAllLogsAsync(ActivityLogQueryRequest request)
        {
            var query = _dbContext.ActivityLogs.AsQueryable();

            if (request.UserId.HasValue)
                query = query.Where(x => x.UserId == request.UserId.Value);

            if (!string.IsNullOrEmpty(request.Action))
                query = query.Where(x => x.Action == request.Action);

            if (!string.IsNullOrEmpty(request.TargetType))
                query = query.Where(x => x.TargetType == request.TargetType);

            if (request.FromDate.HasValue)
                query = query.Where(x => x.CreatedAt >= request.FromDate.Value);

            if (request.ToDate.HasValue)
                query = query.Where(x => x.CreatedAt <= request.ToDate.Value);

            var total = await query.CountAsync();

            var logs = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            var response = logs.Select(log => new ActivityLogResponse
            {
                Id = log.Id,
                UserId = log.UserId,
                UserName = log.UserName,
                Action = log.Action,
                Description = log.Description,
                TargetId = log.TargetId,
                TargetType = log.TargetType,
                CreatedAt = log.CreatedAt,
                CreatedBy = log.CreatedBy,
                UpdatedAt = log.UpdatedAt,
                UpdatedBy = log.UpdatedBy,
                IsActive = log.IsActive,
                IsDeleted = log.IsDeleted,
                DeletedBy = log.DeletedBy
            }).ToList();

            return new ApiResponse<PagedResult<ActivityLogResponse>>(true, 200, new PagedResult<ActivityLogResponse>
            {
                Items = response,
                TotalRecords = total,
                CurrentPage = request.PageNumber,
                PageSize = request.PageSize
            }, "Lấy danh sách logs thành công!");
        }


    }
}
