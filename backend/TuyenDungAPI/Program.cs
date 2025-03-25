using Microsoft.EntityFrameworkCore;
using TuyenDungAPI.Data;
using TuyenDungAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Thêm dịch vụ Swagger (OpenAPI) - Hỗ trợ API Documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký DbContext và Repository từ ServiceExtensions
builder.Services.ConfigureDbContext(builder.Configuration);
builder.Services.ConfigureRepositories();
// Đăng ký DbContext với Connection String từ `appsettings.json`
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Thêm Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Cấu hình middleware cho Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();


