using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace appdev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetMessage()
        {
            return Ok("Hello from ASP.NET Core!");
        }
    }
} 
