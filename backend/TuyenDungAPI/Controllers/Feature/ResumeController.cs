using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TuyenDungAPI.Model.Resume;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.Feature
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeController : ControllerBase
    {
        private readonly ResumeService _resumeService;
        public ResumeController(ResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        ///// <summary>
        ///// Lấy danh sách tất cả Resume, hỗ trợ phân trang và lọc.
        ///// </summary>
        ///// <param name="query">Các tham số để lọc và phân trang (Email, Status, CompanyId, JobId, etc.)</param>
        ///// <returns>Danh sách Resume</returns>
        //[HttpGet]
        //[SwaggerOperation(Summary = "Lấy danh sách tất cả Resume với phân trang và lọc")]
        //public async Task<IActionResult> GetAllResumes([FromQuery] ResumeQueryParameters query)
        //{
        //    // Gọi phương thức GetAllResumesAsync từ service để lấy dữ liệu
        //    var result = await _resumeService.GetAllResumesAsync(query);
        //    return StatusCode(result.Status, result);
        //}

        ///// <summary>
        ///// Lấy danh sách tất cả Resume của User, hỗ trợ phân trang và lọc.
        ///// </summary>
        ///// <param name="userId">ID của người dùng</param>
        ///// <param name="query">Các tham số để lọc và phân trang (Email, Status, CompanyId, JobId, etc.)</param>
        ///// <returns>Danh sách Resume</returns>
        //[HttpGet("get-all-by-user/{userId}")]
        //[SwaggerOperation(Summary = "Lấy danh sách tất cả Resume của User với phân trang và lọc")]
        //public async Task<IActionResult> GetAllResumesByUserId(Guid userId, [FromQuery] ResumeQueryParameters query)
        //{
        //    // Gọi phương thức GetAllResumesByUserIdAsync từ service để lấy dữ liệu
        //    var result = await _resumeService.GetAllResumesByUserIdAsync(userId, query);
        //    return StatusCode(result.Status, result);
        //}

        /// <summary>
        /// Tạo đơn ứng tuyển mới (User nộp đơn ứng tuyển vào Job)
        /// </summary>
        [HttpPost("resume")]
        [SwaggerOperation(Summary = "Nộp đơn ứng tuyển công việc")]
        public async Task<IActionResult> CreateResume([FromBody] CreateResumeRequest request)
        {
            var result = await _resumeService.CreateResumeAsync(request, User);
            return StatusCode(result.Status, result);
        }

    }
}
