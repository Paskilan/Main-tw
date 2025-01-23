using appdev.Models;
using appdev;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StudentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Students
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentTable>>> GetStudents()
    {
        return await _context.Students
            .ToListAsync();
    }

    // GET: api/Students/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<StudentTable>> GetStudent(int id)
    {
        var student = await _context.Students
            .Select(s => new StudentTable
            {
                StudentId = s.StudentId,
                StudentFirstName = s.StudentFirstName,
                StudentLastName = s.StudentLastName,
                StudentEmail = s.StudentEmail,
                CollegeId = s.CollegeId,
                OrgAdmin = s.OrgAdmin
            })
        .FirstOrDefaultAsync(s => s.StudentId == id);

        if (student == null)
        {
            return NotFound();
        }

        return student;
    }

    // POST: api/Students
    [HttpPost]
    public async Task<ActionResult<StudentTable>> CreateStudent(StudentTable student)
    {
        // Ensure navigation properties are valid
        var collegeExists = await _context.Colleges.AnyAsync(c => c.CollegeId == student.CollegeId);
        if (!collegeExists)
        {
            return BadRequest("Invalid CollegeID.");
        }

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
    }

    // PUT: api/Students/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(int id, StudentTable updatedStudent)
    {
        if (id != updatedStudent.StudentId)
        {
            return BadRequest();
        }

        var existingStudent = await _context.Students.FindAsync(id);
        if (existingStudent == null)
        {
            return NotFound();
        }

        // Update properties
        existingStudent.StudentFirstName = updatedStudent.StudentFirstName;
        existingStudent.StudentLastName = updatedStudent.StudentLastName;
        existingStudent.StudentEmail = updatedStudent.StudentEmail;
        existingStudent.StudentPassword = updatedStudent.StudentPassword; // Hash in service layer
        existingStudent.CollegeId = updatedStudent.CollegeId;
        existingStudent.OrgAdmin = updatedStudent.OrgAdmin;

        _context.Entry(existingStudent).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Students.Any(e => e.StudentId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Students/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
        {
            return NotFound();
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
