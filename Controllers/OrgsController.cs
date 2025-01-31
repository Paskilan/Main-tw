using Microsoft.AspNetCore.Mvc;
using appdev.DTOs;
using appdev.Services;
using appdev.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace appdev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrgsController : ControllerBase
    {
        private readonly OrgService _orgService;
        private readonly ApplicationDbContext _context;

        public OrgsController(OrgService orgService, ApplicationDbContext context)
        {
            _orgService = orgService;
            _context = context;
        }

        [HttpGet("orgDisplay")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrgDisplayDto>>> GetOrgs()
        {
            try
            {
                var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (studentIdClaim == null)
                {
                    return Unauthorized(new { message = "User not authenticated properly" });
                }

                int studentId = int.Parse(studentIdClaim.Value);

                var orgs = await _context.Admins
                    .Where(a => a.StudentId == studentId)
                    .Join(
                        _context.Orgs,
                        admin => admin.OrgId,
                        org => org.OrgId,
                        (admin, org) => new OrgDisplayDto
                        {
                            Id = org.OrgId,
                            Name = org.OrgName,
                            ImageUrl = $"data:image/png;base64,{Convert.ToBase64String(org.OrgLogo)}"
                        })
                    .ToListAsync();

                return Ok(orgs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching organizations" });
            }
        }
    

    [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateOrg([FromBody] CreateOrgDto createOrgDto)
        {
            if (string.IsNullOrEmpty(createOrgDto.ImageBase64))
            {
                return BadRequest(new OrgResponse<OrgResponseDto>
                {
                    Success = false,
                    Message = "Image is required"
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new OrgResponse<OrgResponseDto>
                {
                    Success = false,
                    Message = "Invalid input data"
                });
            }

            var result = await _orgService.CreateOrgAsync(createOrgDto, User);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        public class OrgDisplayDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string ImageUrl { get; set; }
        }
    }
}
