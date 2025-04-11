namespace TuyenDungAPI.Service;

using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Database;
using TuyenDungAPI.Model.Company;
using TuyenDungAPI.Model.ModelBase;

public class CompanyService
{
    private readonly DataContext _dbContext;

    public CompanyService(DataContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApiResponse<PagedResult<CompanyResponse>>> GetAllCompaniesAsync(CompanyQueryParameters query)
    {
        // Khởi tạo query để truy vấn các công ty chưa bị xóa
        var companiesQuery = _dbContext.Company
            .Where(co => !co.IsDeleted)
            .AsQueryable();

        companiesQuery = companiesQuery.OrderByDescending(r => r.CreatedAt);
        // Lọc theo Tên công ty nếu có
        if (!string.IsNullOrWhiteSpace(query.Keyword))
        {
            companiesQuery = companiesQuery.Where(co => co.Name.Contains(query.Keyword));
        }

        // Lọc theo ngành nghề công ty nếu có
        if (!string.IsNullOrWhiteSpace(query.Industry))
        {
            companiesQuery = companiesQuery.Where(co => co.Industry.Contains(query.Industry));
        }

        // Lọc theo quy mô công ty nếu có
        if (!string.IsNullOrWhiteSpace(query.CompanySize))
        {
            companiesQuery = companiesQuery.Where(co => co.CompanySize.Contains(query.CompanySize));
        }

        // Lọc theo địa chỉ công ty nếu có
        if (!string.IsNullOrWhiteSpace(query.Address))
        {
            companiesQuery = companiesQuery.Where(co => co.Address.Contains(query.Address));
        }

        // Pagination
        var totalRecords = await companiesQuery.CountAsync();

        var companies = await companiesQuery
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        // Chuyển đổi thành response
        var response = new PagedResult<CompanyResponse>
        {
            CurrentPage = query.PageNumber,
            PageSize = query.PageSize,
            TotalRecords = totalRecords,
            Items = companies.Select(co => new CompanyResponse(co)).ToList()
        };

        if (!response.Items.Any())
        {
            return new ApiResponse<PagedResult<CompanyResponse>>(true, 200, response, "Không có công ty nào trong hệ thống!");
        }

        return new ApiResponse<PagedResult<CompanyResponse>>(true, 200, response, "Lấy danh sách công ty thành công");
    }
    public async Task<ApiResponse<CompanyResponse>> GetCompanyByIdAsync(Guid id)
    {
        var company = await _dbContext.Company
            .FirstOrDefaultAsync(c => !c.IsDeleted && c.Id == id);

        if (company == null)
        {
            return new ApiResponse<CompanyResponse>(false, 404, null, "Không tìm thấy công ty!");
        }

        var response = new CompanyResponse(company);
        return new ApiResponse<CompanyResponse>(true, 200, response, "Lấy thông tin công ty thành công");
    }
    public async Task<ApiResponse<CompanyResponse>> GetCompanyByIdForClientAsync(Guid id)
    {
        var company = await _dbContext.Company
            .FirstOrDefaultAsync(c => !c.IsDeleted && c.Id == id && c.IsActive);

        if (company == null)
        {
            return new ApiResponse<CompanyResponse>(false, 404, null, "Không tìm thấy công ty!");
        }

        var response = new CompanyResponse(company);
        return new ApiResponse<CompanyResponse>(true, 200, response, "Lấy thông tin công ty thành công");
    }
    public async Task<ApiResponse<CompanyResponse>> CreateCompanyAsync(CreateCompanyRequest request, ClaimsPrincipal currentUser)
    {
        var existingCompany = await _dbContext.Company
            .Where(c => !c.IsDeleted && c.Name.ToLower() == request.Name.ToLower())
            .FirstOrDefaultAsync();

        if (existingCompany != null)
        {
            return new ApiResponse<CompanyResponse>(false, 400, null, "Tên công ty đã tồn tại trong hệ thống");
        }

        string createdBy = currentUser?.Identity?.Name ?? "System";

        var newCompany = new Company
        {
            Name = request.Name,
            CompanyModel = request.CompanyModel,
            Industry = request.Industry,
            CompanySize = request.CompanySize,
            Address = request.Address,
            Description = request.Description,
            WorkingTime = request.WorkingTime,
            LogoUrl = null, // Có thể null, ảnh xử lý riêng
            CreatedAt = DateTime.UtcNow,
            CreatedBy = createdBy,
            IsActive = true,
            IsDeleted = false
        };

        _dbContext.Company.Add(newCompany);
        await _dbContext.SaveChangesAsync();

        var response = new CompanyResponse(newCompany);
        return new ApiResponse<CompanyResponse>(true, 201, response, "Tạo công ty thành công");
    }
    public async Task<ApiResponse<CompanyResponse>> UploadCompanyLogoAsync(UploadCompanyLogoRequest request, ClaimsPrincipal currentUser)
    {
        // Tìm kiếm công ty theo Id
        var company = await _dbContext.Company
            .Where(c => !c.IsDeleted && c.Id == request.CompanyId)
            .FirstOrDefaultAsync();

        if (company == null)
        {
            return new ApiResponse<CompanyResponse>(false, 404, null, "Không tìm thấy công ty");
        }

        // Kiểm tra loại file
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var fileExtension = Path.GetExtension(request.Logo.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(fileExtension))
        {
            return new ApiResponse<CompanyResponse>(false, 400, null, "Chỉ chấp nhận file hình ảnh (jpg, jpeg, png, gif)");
        }

        // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
        if (request.Logo.Length > 5 * 1024 * 1024)
        {
            return new ApiResponse<CompanyResponse>(false, 400, null, "Kích thước file không được vượt quá 5MB");
        }

        try
        {
            // Tạo tên file duy nhất
            string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            // Đường dẫn lưu file (tùy chỉnh theo cấu trúc thư mục của bạn)
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "company");

            // Đảm bảo thư mục tồn tại
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Lưu file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await request.Logo.CopyToAsync(fileStream);
            }

            // Cập nhật đường dẫn logo trong DB
            string logoUrl = $"/uploads/company/{uniqueFileName}";
            company.LogoUrl = logoUrl;
            company.UpdatedAt = DateTime.UtcNow;
            company.UpdatedBy = currentUser?.Identity?.Name ?? "System";

            await _dbContext.SaveChangesAsync();

            var response = new CompanyResponse(company);
            return new ApiResponse<CompanyResponse>(true, 200, response, "Upload logo thành công");
        }
        catch (Exception ex)
        {
            // Ghi log lỗi nếu cần
            return new ApiResponse<CompanyResponse>(false, 500, null, $"Lỗi khi upload logo: {ex.Message}");
        }
    }
    public async Task<ApiResponse<CompanyResponse>> UpdateCompanyAsync(Guid id, UpdateCompanyRequest request, ClaimsPrincipal currentUser)
    {
        // Tìm công ty theo ID từ URL (không cần lấy id từ request body nữa)
        var company = await _dbContext.Company
            .FirstOrDefaultAsync(c => !c.IsDeleted && c.Id == id);

        if (company == null)
        {
            return new ApiResponse<CompanyResponse>(false, 404, null, "Không tìm thấy công ty!");
        }

        // Cập nhật thông tin công ty
        company.Name = request.Name;
        company.CompanyModel = request.CompanyModel;
        company.Industry = request.Industry;
        company.CompanySize = request.CompanySize;
        company.Address = request.Address;
        company.Description = request.Description;
        company.WorkingTime = request.WorkingTime;
        company.UpdatedAt = DateTime.UtcNow;
        company.UpdatedBy = currentUser?.Identity?.Name ?? "System";
        company.IsActive = request.IsActive;

        await _dbContext.SaveChangesAsync();

        var response = new CompanyResponse(company);
        return new ApiResponse<CompanyResponse>(true, 200, response, "Cập nhật công ty thành công");
    }
    public async Task<ApiResponse<DeleteComnpanysResponse>> DeleteCompaniesAsync(DeleteCompanyRequest request, ClaimsPrincipal currentUser)
    {
        var deletedBy = currentUser?.Identity?.Name ?? "System";
        // Kiểm tra nếu danh sách rỗng
        if (request.CompanysId == null || !request.CompanysId.Any())
        {
            return new ApiResponse<DeleteComnpanysResponse>(false, 400, null, "Không có công ty nào được chỉ định để xóa!");
        }

        // Tìm các công ty cần cập nhật IsDeleted
        var companiesToDelete = await _dbContext.Company
            .Where(c => request.CompanysId.Contains(c.Id) && !c.IsDeleted) // Chỉ lấy công ty chưa bị xóa
            .ToListAsync();

        if (!companiesToDelete.Any())
        {
            return new ApiResponse<DeleteComnpanysResponse>(false, 404, null, "Không tìm thấy công ty nào hợp lệ để xóa!");
        }

        // Cập nhật IsDeleted = true thay vì xóa khỏi DB
        foreach (var company in companiesToDelete)
        {
            company.IsDeleted = true;
            company.DeletedBy = deletedBy;
        }

        await _dbContext.SaveChangesAsync(); // Lưu thay đổi

        // Tạo response
        var deletedCompanyNames = companiesToDelete.Select(c => c.Name).ToList();
        var response = new DeleteComnpanysResponse
        {
            DeletedCount = companiesToDelete.Count,
            DeletedCompanyNames = deletedCompanyNames
        };

        var message = companiesToDelete.Count == 1
            ? $"Xóa công ty '{deletedCompanyNames[0]}' thành công!"
            : $"Xóa {companiesToDelete.Count} công ty thành công!";

        return new ApiResponse<DeleteComnpanysResponse>(true, 200, response, message);
    }
    public async Task<ApiResponse<List<CompanyResponse>>> GetTop6CompaniesAsync()
    {
        var companies = await _dbContext.Company
            .Where(j => !j.IsDeleted && j.IsActive)   // 🔥 Chỉ lấy Job chưa xóa và đang Active
            .OrderByDescending(co => co.CreatedAt)     // 🔥 Mới nhất trước
            .Take(6)                                   // 🔥 Lấy 6 công ty
            .ToListAsync();

        var response = companies.Select(co => new CompanyResponse(co)).ToList();

        if (!response.Any())
        {
            return new ApiResponse<List<CompanyResponse>>(true, 200, response, "Không có công ty nào!");
        }

        return new ApiResponse<List<CompanyResponse>>(true, 200, response, "Lấy 6 công ty mới nhất thành công!");
    }

}
