using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TuyenDungAPI.Model.ActivityLog;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogsController : ControllerBase
    {

        private readonly ActivityLogService _logService;

        public ActivityLogsController(ActivityLogService logService)
        {
            _logService = logService;
        }

        [HttpPost("query")]
        [SwaggerOperation(Summary = "Lấy danh sách log hoạt động (lọc & phân trang)")]
        public async Task<IActionResult> GetLogs([FromBody] ActivityLogQueryRequest request)
        {
            var result = await _logService.GetAllLogsAsync(request);
            return StatusCode(result.Status, result);
        }

    }
}
