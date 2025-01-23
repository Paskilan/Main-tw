using appdev.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CollegesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CollegesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CollegeDto>>> GetColleges()
    {
        var colleges = await _context.Colleges
            .Select(c => new CollegeDto
            {
                CollegeId = c.CollegeId,
                CollegeName = c.CollegeName
            })
            .ToListAsync();

        return Ok(colleges);
    }
}

public class CollegeDto
{
    public int CollegeId { get; set; }
    public string CollegeName { get; set; }
}