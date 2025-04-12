using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TuyenDungAPI.Model.Job;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.Feature
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase 
    {
        private readonly JobService _jobService;
        public JobController(JobService jobService)
        {
            _jobService = jobService;
        }

        /// <summary>
        /// Lấy toàn bộ danh sách công việc có phân trang
        /// </summary>
        [HttpGet]
        [SwaggerOperation(Summary = "Lấy danh sách tất cả job (dành cho admin, có phân trang & lọc)")]
        public async Task<IActionResult> GetAllJobs([FromQuery] JobQueryParameters query)
        {
            var result = await _jobService.GetAllJobsAsync(query);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy chi tiết công việc theo ID (dành cho admin)
        /// </summary>
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Lấy chi tiết công việc theo ID (dành cho admin)")]
        public async Task<IActionResult> GetJobById(Guid id)
        {
            var result = await _jobService.GetJobByIdAsync(id);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy chi tiết công việc theo ID (dành cho client)
        /// </summary>
        [HttpGet("{id}/client")]
        [SwaggerOperation(Summary = "Lấy chi tiết công việc theo ID (dành cho client)")]
        public async Task<IActionResult> GetJobByForClientId(Guid id)
        {
            var result = await _jobService.GetJobByIdForClientAsync(id);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Tạo mới một công việc trong hệ thống.
        /// </summary>
        /// <param name="request">Thông tin công việc cần tạo.</param>
        /// <returns>Kết quả tạo công việc.</returns>
        [HttpPost]
        [SwaggerOperation(Summary = "Tạo công việc mới (dành cho admin)")]
        public async Task<IActionResult> CreateJob([FromBody] CreateJobRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _jobService.CreateJobAsync(request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Cập nhật công việc theo ID.
        /// </summary>
        /// <param name="id">ID công việc cần cập nhật.</param>
        /// <param name="request">Thông tin cập nhật công việc.</param>
        /// <returns>Kết quả cập nhật.</returns>
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Cập nhật công việc theo ID (dành cho admin)")]
        public async Task<IActionResult> UpdateJob(Guid id, [FromBody] UpdateJobRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _jobService.UpdateJobAsync(id, request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Xóa mềm 1 hoặc nhiều công việc.
        /// </summary>
        /// <param name="request">Danh sách ID công việc cần xóa.</param>
        /// <returns>Kết quả xóa.</returns>
        [HttpDelete("delete")]
        [SwaggerOperation(Summary = "Xóa 1 hoặc nhiều công việc (soft delete)")]
        public async Task<IActionResult> DeleteJobs([FromBody] DeleteJobRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _jobService.DeleteJobsAsync(request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy danh sách các công việc theo CompanyId.
        /// </summary>
        /// <param name="companyId">ID công ty.</param>
        /// <returns>Danh sách các công việc.</returns>
        [HttpGet("{companyId}/jobsBycompany")]
        [SwaggerOperation(Summary = "Lấy danh sách Job theo công ty")]
        public async Task<IActionResult> GetJobsByCompany(Guid companyId)
        {
            var result = await _jobService.GetJobsByCompanyAsync(companyId);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy 6 công việc mới nhất (không phân trang, không lọc)
        /// </summary>
        /// <returns>Danh sách 6 công việc mới nhất</returns>
        [HttpGet("top-6-latest")]
        [SwaggerOperation(Summary = "Lấy 6 công việc mới nhất (client view)")]

        public async Task<IActionResult> GetTop6LatestJobs()
        {
            var result = await _jobService.GetTop6LatestJobsAsync();
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Tìm kiếm danh sách công việc theo nhiều tiêu chí (Keyword, Location, Level, Salary).
        /// </summary>
        /// <param name="request">Tiêu chí tìm kiếm công việc</param>
        /// <returns>Danh sách công việc phù hợp</returns>
        [HttpPost("search")]
        [SwaggerOperation(Summary = "Tìm kiếm công việc (Jobs) theo từ khóa, địa điểm, mức lương, cấp độ")]
        [ProducesResponseType(typeof(ApiResponse<PagedResult<JobResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchJobs([FromBody] JobSearchRequest request)
        {
            var result = await _jobService.SearchJobsAsync(request);
            return StatusCode(result.Status, result);
        }


    }
}
