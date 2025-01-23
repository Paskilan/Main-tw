using appdev.Models;
using appdev;
using Microsoft.EntityFrameworkCore;

public class StudentService
{
    private readonly ApplicationDbContext _context;

    public StudentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<StudentTable>> GetAllStudentsAsync()
    {
        return await _context.Students
            .Include(s => s.CollegeId)
            .Include(s => s.OrgCount)
            .ToListAsync();
    }

    public async Task<StudentTable> GetStudentByIdAsync(int id)
    {
        return await _context.Students
            .Include(s => s.CollegeId)
            .Include(s => s.OrgCount)
            .FirstOrDefaultAsync(s => s.StudentId == id);
    }

    public async Task<StudentTable> AddStudentAsync(StudentTable student)
    {
        var collegeExists = await _context.Colleges.AnyAsync(c => c.CollegeId == student.CollegeId);
        if (!collegeExists)
        {
            throw new ArgumentException("Invalid CollegeID.");
        }

        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return student;
    }

    public async Task<bool> UpdateStudentAsync(int id, StudentTable updatedStudent)
    {
        var existingStudent = await _context.Students.FindAsync(id);
        if (existingStudent == null)
        {
            return false;
        }

        // Update fields
        existingStudent.StudentFirstName = updatedStudent.StudentFirstName;
        existingStudent.StudentLastName = updatedStudent.StudentLastName;
        existingStudent.StudentEmail = updatedStudent.StudentEmail;
        existingStudent.StudentPassword = updatedStudent.StudentPassword; // Hash in the service layer
        existingStudent.CollegeId = updatedStudent.CollegeId;
        existingStudent.OrgAdmin = updatedStudent.OrgAdmin;

        _context.Entry(existingStudent).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteStudentAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
        {
            return false;
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return true;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", builder =>
            {
                builder.WithOrigins("http://localhost:5173") // Replace with your frontend URL
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        services.AddControllers();
    }
}
