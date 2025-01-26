using appdev.Models;
using appdev.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace AppDev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        public AccountController(AccountService AccountService)
        {
            _accountService = AccountService;

        }


        [HttpGet("colleges")]
        public async Task<ActionResult<IEnumerable<CollegeDto>>> GetColleges()
        {
            var colleges = await _accountService.GetCollegesAsync();

            return Ok(colleges);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse
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

                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid credentials"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse
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

                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = result.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                });
            }
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
    }

    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public UserDto User { get; set; }
    }

    public class ApiResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class UserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CollegeId { get; set; }
    }

    public interface IAuthService
    {
        Task<AuthResponse> AuthenticateAsync(LoginRequest request);
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
    }

}

