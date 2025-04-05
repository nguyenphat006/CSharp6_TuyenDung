using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        /// Lấy toàn bộ danh sách công ty
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            var result = await _companyService.GetAllCompanysAsync();
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Lấy thông tin công ty theo ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyById(Guid id)
        {
            var result = await _companyService.GetCompanyByIdAsync(id);
            return StatusCode(result.Status, result);
        }

        /// <summary>
        /// Tạo công ty mới
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.CreateCompanyAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Upload logo cho công ty
        /// </summary>
        [HttpPost("upload-logo")]
        public async Task<IActionResult> UploadCompanyLogo([FromForm] UploadCompanyLogoRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.UploadCompanyLogoAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Cập nhật thông tin công ty
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(Guid id, [FromBody] UpdateCompanyRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.UpdateCompanyAsync(request, User);
            return StatusCode(response.Status, response);
        }

        /// <summary>
        /// Xóa một hoặc nhiều công ty
        /// </summary>
        [HttpDelete]
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

    }
}
