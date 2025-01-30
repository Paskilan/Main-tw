using Microsoft.AspNetCore.Mvc;
using appdev.DTOs;
using appdev.Services;
using appdev.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<OrgResponseDto>>> GetOrgs()
        {
            var orgs = await _context.Orgs
                .Select(o => new OrgResponseDto
                {
                    Id = o.OrgId,
                    Name = o.OrgName,
                    Description = o.OrgDescription,
                    ImageUrl = $"data:image/png;base64,{Convert.ToBase64String(o.OrgLogo)}" // Providing a data URL
                })
                .ToListAsync();

            return Ok(orgs);
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

            var result = await _orgService.CreateOrgAsync(createOrgDto);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
