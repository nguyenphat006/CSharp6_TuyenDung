using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TuyenDungAPI.Model;

namespace TuyenDungAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProduct()
        {
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product 1", Description = "Description 1" },
                new Product { Id = 2, Name = "Product 2", Description = "Description 2" },
                new Product { Id = 3, Name = "Product 3", Description = "Description 3" }
            };
            return Ok(products);
        }
    }
}
