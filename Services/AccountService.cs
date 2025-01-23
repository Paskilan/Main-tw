using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using appdev.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using AppDev.Controllers;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.Extensions.Options;

namespace appdev.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public AccountService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _jwtSettings = new JwtSettings
            {
                SecretKey = configuration["Jwt:SecretKey"],
                Issuer = configuration["Jwt:Issuer"],
                Audience = configuration["Jwt:Audience"],
                ExpirationMinutes = int.Parse(configuration["Jwt:ExpirationMinutes"])
            };
        }

        public async Task<AuthResponse> AuthenticateAsync(LoginRequest request)
        {
            var user = await _context.Students
                .FirstOrDefaultAsync(u => u.StudentEmail == request.Email);

            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            if (!VerifyPassword(request.Password, user.StudentPassword))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid password"
                };
            }

            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (await _context.Students.AnyAsync(u => u.StudentEmail == request.Email))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Email already registered"
                };
            }
            if (!await _context.Colleges.AnyAsync(c => c.CollegeId == request.CollegeId))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid college ID"
                };
            }

            var hashedPassword = HashPassword(request.Password);

            var user = new StudentTable
            {
                StudentFirstName = request.FirstName,
                StudentLastName = request.LastName,
                StudentEmail = request.Email,
                CollegeId = request.CollegeId,
                StudentPassword = hashedPassword,
                OrgCount = 0, // Assuming OrgCount starts at 0
                OrgAdmin = "No" // Assuming OrgAdmin starts as "No"
            };

            _context.Students.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                User = MapToUserDto(user)
            };
        }

        public async Task<List<CollegeDto>> GetCollegesAsync()
        {
            var colleges = await _context.Colleges
                .Select(c => new CollegeDto
                {
                    CollegeId = c.CollegeId,
                    CollegeName = c.CollegeName
                })
                .ToListAsync();

            return colleges;
        }

        private string GenerateJwtToken(StudentTable user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.StudentId.ToString()),
                new Claim(ClaimTypes.Email, user.StudentEmail),
                new Claim(ClaimTypes.GivenName, user.StudentFirstName),
                new Claim(ClaimTypes.Surname, user.StudentLastName),
                new Claim("CollegeId", user.CollegeId.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserDto MapToUserDto(StudentTable user)
        {
            return new UserDto
            {
                Email = user.StudentEmail,
                FirstName = user.StudentFirstName,
                LastName = user.StudentLastName,
                CollegeId = user.CollegeId
            };
        }

        public class CollegeDto
        {
            public int CollegeId { get; set; }
            public string CollegeName { get; set; }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, storedPassword);
        }
    }
}