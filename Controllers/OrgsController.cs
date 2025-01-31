using Microsoft.AspNetCore.Mvc;
using appdev.DTOs;
using appdev.Services;
using appdev.Models;
using Microsoft.AspNetCore.Authorization;

namespace appdev.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrgsController : ControllerBase
    {
        private readonly OrgService _OrgService;

        public OrgsController(OrgService orgService)
        {
            _OrgService = orgService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OrgTable>> CreateOrg([FromBody] CreateOrgDto request)
        {
            var collegeIdClaim = User.FindFirst("CollegeId")?.Value;
            if (!int.TryParse(collegeIdClaim, out var collegeId))
            {
                return BadRequest("Invalid CollegeId in token");
            }

            try
            {
                var org = await _OrgService.CreateOrgAsync(request, collegeId);
                return Ok(org);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
}
}