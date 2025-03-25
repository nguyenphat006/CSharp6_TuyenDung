using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TuyenDungAPI.Data;
using TuyenDungAPI.Repositories;

namespace TuyenDungAPI.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            // Đăng ký thêm repository khác ở đây...
        }

        public static void ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
