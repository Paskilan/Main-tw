using appdev.Models;
using appdev.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using appdev.DTOs;
using static appdev.Controllers.AccountController.RegisterRequest;

namespace appdev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly ApplicationDbContext _context;
        public AccountController(AccountService AccountService, ApplicationDbContext context)
        {
            _accountService = AccountService;
            _context = context;

        }


        [HttpGet("colleges")]
        public async Task<ActionResult<IEnumerable<CollegeDto>>> GetColleges()
        {
            var colleges = await _accountService.GetCollegesAsync();

            return Ok(colleges);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse<UserDto>>> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new AuthResponse<UserDto>
                    {
                        Success = false,
                        Message = "Invalid input data"
                    });
                }

                var result = await _accountService.AuthenticateAsync(request);

                if (result.Success)
                {
                    return Ok(result);
                }

                return Unauthorized(new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = "Invalid credentials"
                });
}
            catch (Exception)

            {
                return StatusCode(500, new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse<UserDto>>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new AuthResponse<UserDto>
                    {
                        Success = false,
                        Message = "Invalid input data"
                    });
                }

                var result = await _accountService.RegisterAsync(request);

                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = result.Message
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                });
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<ActionResult<StudentProfileDto>>> GetStudentProfile()
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized(new AuthResponse<UserDto>
                    {
                        Success = false,
                        Message = "User not authenticated"
                    });
                }

                var result = await _accountService.GetStudentProfileAsync(userEmail);

                if (!result.Success)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }

            catch (Exception)
            {
                return StatusCode(500, new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = "An error occurred while fetching the profile"
                });
            }
        }

        [HttpPost("update-profile")]
        [Authorize]
        public async Task<ActionResult<AuthResponse<UserDto>>> UpdateProfile([FromForm] UpdateProfileRequest request)
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized(new AuthResponse<UserDto>
                    {
                        Success = false,
                        Message = "User not authenticated"
                    });
                }

                var result = await _accountService.UpdateProfileAsync(userEmail, request);

                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new AuthResponse<UserDto>
                {
                    Success = false,
                    Message = "An error occurred while updating profile"
                });
            }
        }

        public class LoginRequest
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [MinLength(6)]
            public string Password { get; set; }
        }

        public class RegisterRequest
        {
            [Required]
            [StringLength(50)]
            public string FirstName { get; set; }

            [Required]
            [StringLength(50)]
            public string LastName { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public int CollegeId { get; set; }

            [Required]
            [MinLength(6)]
            public string Password { get; set; }
            public IFormFile? ProfilePicture { get; set; } 
            public class UpdateProfileRequest
            {
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public string Password { get; set; }
                public IFormFile ProfilePicture { get; set; }
            }
        }
    }
}
