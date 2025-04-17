using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.ModelBase;
using TuyenDungAPI.Service;

namespace TuyenDungAPI.Controllers.Feature
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }

        /// <summary>
        /// Lấy danh sách toàn bộ công ty hiện tại trong hệ thống, hỗ trợ phân trang và lọc.
        /// </summary>
        /// <param name="query">Các tham số lọc và phân trang</param>
        /// <returns>Danh sách công ty</returns>
        [HttpGet]
        [SwaggerOperation(Summary = "Lấy danh sách toàn bộ công ty hiện tại trong hệ thống, hỗ trợ phân trang và lọc")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCompanies([FromQuery] CompanyQueryParameters query)
        {
            // Gọi service để lấy danh sách công ty với các tham số lọc và phân trang
            var result = await _companyService.GetAllCompaniesAsync(query);

            // Trả về kết quả
            return StatusCode(result.Status, result);
        }


        /// <summary>
        /// Lấy thông tin chi tiết công ty theo ID.
        /// </summary>
        /// <param name="id">ID công ty cần lấy thông tin</param>
        /// <returns>Thông tin công ty</returns>
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Lấy thông tin chi tiết công ty theo ID")]
        public async Task<IActionResult> GetCompanyById(Guid id)
        {
            var result = await _companyService.GetCompanyByIdAsync(id);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy thông tin chi tiết công ty theo ID cho Client.
        /// </summary>
        /// <param name="id">ID công ty cần lấy thông tin</param>
        /// <returns>Thông tin công ty</returns>
        [HttpGet("{id}/client")]
        [SwaggerOperation(Summary = "Lấy thông tin chi tiết công ty theo ID dành cho Client")]
        public async Task<IActionResult> GetCompanyByForClientId(Guid id)
        {
            var result = await _companyService.GetCompanyByIdForClientAsync(id);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Tạo một công ty mới và thêm vào hệ thống.
        /// </summary>
        /// <param name="request">Thông tin công ty cần tạo</param>
        /// <returns>Thông tin công ty mới được tạo</returns>
        [HttpPost]
        [SwaggerOperation(Summary = "Tạo một công ty mới và thêm vào hệ thống")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.CreateCompanyAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Upload logo cho công ty.
        /// </summary>
        /// <param name="request">Yêu cầu chứa tệp hình ảnh logo công ty</param>
        /// <returns>Kết quả upload logo</returns>
        [HttpPost("upload-logo")]
        [SwaggerOperation(Summary = "Upload logo cho công ty")]
        public async Task<IActionResult> UploadCompanyLogo([FromForm] UploadCompanyLogoRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.UploadCompanyLogoAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Cập nhật thông tin công ty.
        /// </summary>
        /// <param name="id">ID công ty cần cập nhật</param>
        /// <param name="request">Thông tin cần cập nhật cho công ty</param>
        /// <returns>Kết quả cập nhật công ty</returns>
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Cập nhật thông tin công ty")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCompany(Guid id, [FromBody] UpdateCompanyRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Truyền id từ URL vào service, không cần lấy từ body nữa
            var response = await _companyService.UpdateCompanyAsync(id, request, User);
            return StatusCode(response.Status, response);
        }


        /// <summary>
        /// Xóa một hoặc nhiều công ty khỏi hệ thống.
        /// </summary>
        /// <param name="request">Danh sách công ty cần xóa</param>
        /// <returns>Kết quả xóa công ty</returns>
        [HttpDelete]
        [SwaggerOperation(Summary = "Xóa một hoặc nhiều công ty khỏi hệ thống")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCompanies([FromBody] DeleteCompanyRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new ApiResponse<object>(false, 400, null, string.Join(", ", errors)));
            }

            var response = await _companyService.DeleteCompaniesAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Lấy 6 công ty mới nhất (không phân trang, không lọc)
        /// </summary>
        /// <returns>Danh sách 6 công ty mới nhất</returns>
        [HttpGet("top-6-latest")]
        [SwaggerOperation(Summary = "Lấy 6 công ty mới nhất (client view)")]
        public async Task<IActionResult> GetTop6Companies()
        {
            var result = await _companyService.GetTop6CompaniesAsync();
            return StatusCode(result.Status, result);
        }

    }
}
