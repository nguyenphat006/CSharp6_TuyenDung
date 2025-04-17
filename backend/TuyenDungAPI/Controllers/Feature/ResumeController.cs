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


        /// <summary>
        /// Nộp đơn ứng tuyển (tạo Resume mới với file đính kèm).
        /// </summary>
        /// <param name="request">Thông tin đơn ứng tuyển: companyId, jobId, file CV.</param>
        /// <returns>Thông tin Resume sau khi tạo.</returns>
        [HttpPost]
        [SwaggerOperation(Summary = "Nộp đơn ứng tuyển (Resume) với file đính kèm")]
        public async Task<IActionResult> CreateResume([FromForm] CreateResumeRequest request)
        {
            var result = await _resumeService.CreateResumeAsync(request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy danh sách đơn ứng tuyển có phân trang và lọc
        /// </summary>
        /// <param name="parameters">Các điều kiện lọc và phân trang</param>
        /// <returns>Danh sách đơn ứng tuyển</returns>
        [HttpGet]
        [SwaggerOperation(Summary = "Danh sách đơn ứng tuyển (filter + paging) dành cho trang Admin")]
        [Authorize]
        public async Task<IActionResult> GetAllResumes([FromQuery] ResumeQueryParameters parameters)
        {
            var result = await _resumeService.GetAllResumesAsync(parameters);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy chi tiết đơn ứng tuyển theo Id
        /// </summary>
        /// <param name="id">ID của Resume</param>
        /// <returns>Chi tiết đơn ứng tuyển</returns>
        [HttpGet]
        [Route("{ResumeId:guid}")]
        [SwaggerOperation(Summary = "Lấy chi tiết đơn ứng tuyển theo ID")]
        [Authorize]
        public async Task<IActionResult> GetResumeById(Guid id)
        {
            var result = await _resumeService.GetResumeByIdAsync(id);
            return StatusCode(result.Status, result);
        }


        /// <summary>
        /// Cập nhật trạng thái đơn ứng tuyển
        /// </summary>
        /// <param name="resumeId">ID của Resume</param>
        /// <param name="request">Thông tin trạng thái mới</param>
        /// <returns>Resume đã được cập nhật trạng thái</returns>
        [HttpPut]
        [Route("{ResumeId:guid}/change-status")]
        [SwaggerOperation(Summary = "Cập nhật trạng thái đơn ứng tuyển")]
        [Authorize]
        public async Task<IActionResult> ChangeResumeStatus(Guid resumeId, [FromBody] UpdateStatusResumeRequest request)
        {
            var result = await _resumeService.ChangeResumeStatusAsync(resumeId, request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Xoá mềm nhiều đơn ứng tuyển
        /// </summary>
        /// <param name="request">Danh sách ResumeIds cần xoá</param>
        /// <returns>Kết quả xoá</returns>
        [HttpDelete]
        [SwaggerOperation(Summary = "Xoá mềm nhiều đơn ứng tuyển (soft delete)")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteResumes([FromBody] DeleteResumeRequest request)
        {
            var result = await _resumeService.DeleteResumesAsync(request, User);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy toàn bộ đơn ứng tuyển của người dùng hiện tại (không phân trang)
        /// </summary>
        /// <returns>Danh sách đơn ứng tuyển</returns>
        [HttpPost]
        [Route("get-all-by-user")]
        [SwaggerOperation(Summary = "Lấy toàn bộ đơn ứng tuyển của user (dùng token)")]
        public async Task<IActionResult> GetAllResumesByUser()
        {
            var result = await _resumeService.GetResumesByUserAsync(User);
            return StatusCode(result.Status, result);
        }







    }
}
