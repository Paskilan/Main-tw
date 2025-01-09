using appdev.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace appdev.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExampleController : ControllerBase
    {
        private readonly DatabaseService _databaseService;

        public ExampleController(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpGet("GetCurrentDate")]
        public IActionResult GetCurrentDate()
        {
            using var connection = _databaseService.GetConnection();
            connection.Open();
            var query = "SELECT GETDATE()";

            using var command = new SqlCommand(query, (SqlConnection)connection);
            var result = command.ExecuteScalar();

            return Ok(new { currentDate = result });
        }
    }
}
