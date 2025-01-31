using Microsoft.AspNetCore.Mvc;
using appdev.DTOs;
using appdev.Services;

namespace appdev.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly ILogger<AdminController> _logger;

        public AdminController(IAdminService adminService, ILogger<AdminController> logger)
        {
            _adminService = adminService;
            _logger = logger;
        }

        [HttpGet("organization/{orgId}")]
        public async Task<ActionResult<OrganizationDTO>> GetOrganizationDetails(int orgId)
        {
            try
            {
                var organization = await _adminService.GetOrganizationDetailsAsync(orgId);
                if (organization == null)
                    return NotFound(new { message = "Organization not found." });

                return Ok(organization);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving organization details.");
                return StatusCode(500, new { message = "An error occurred while retrieving organization details." });
            }
        }

        [HttpPut("organization/{orgId}/description")]
        public async Task<IActionResult> UpdateOrganizationDescription(int orgId, [FromBody] string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                return BadRequest(new { message = "Description cannot be empty." });

            try
            {
                await _adminService.UpdateOrganizationDescriptionAsync(orgId, description);
                return Ok(new { message = "Organization description updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization description.");
                return StatusCode(500, new { message = "An error occurred while updating organization description." });
            }
        }

        [HttpPut("organization/{orgId}/details")]
        public async Task<IActionResult> UpdateOrganizationDetails(int orgId, [FromBody] OrganizationDetailsUpdateRequest request)
        {
            if (request == null)
                return BadRequest(new { message = "Invalid request data." });

            try
            {
                await _adminService.UpdateOrganizationDetailsAsync(orgId, request.Organization, request.College, request.Email);
                return Ok(new { message = "Organization details updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization details.");
                return StatusCode(500, new { message = "An error occurred while updating organization details." });
            }
        }

        [HttpPut("organization/{orgId}/socials")]
        public async Task<IActionResult> UpdateOrganizationSocials(int orgId, [FromBody] List<SocialMediaDTO> socials)
        {
            if (socials == null || socials.Count == 0)
                return BadRequest(new { message = "Invalid social media data." });

            try
            {
                await _adminService.UpdateOrganizationSocialsAsync(orgId, socials);
                return Ok(new { message = "Organization social media links updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating social media links.");
                return StatusCode(500, new { message = "An error occurred while updating social media links." });
            }
        }

        [HttpPut("organization/{orgId}/logo")]
        public async Task<IActionResult> UpdateOrganizationLogo(int orgId, byte[] image)
        {
            if (image == null || image.Length == 0)
                return BadRequest(new { message = "No file uploaded." });

            try
            {
                 await _adminService.UpdateOrganizationLogoAsync(orgId, image);
                return Ok(new { message = "Organization logo updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization logo.");
                return StatusCode(500, new { message = "An error occurred while updating organization logo." });
            }
        }

        [HttpPut("organization/{orgId}/header")]
        public async Task<IActionResult> UpdateOrganizationHeader(int orgId, byte[] image)
        {
            if (image == null || image.Length == 0)
                return BadRequest(new { message = "No file uploaded." });

            try
            {
                 await _adminService.UpdateOrganizationHeaderAsync(orgId, image);
                return Ok(new { message = "Organization header updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization header.");
                return StatusCode(500, new { message = "An error occurred while updating organization header." });
            }
        }

        [HttpPut("organization/{orgId}/highlights")]
        public async Task<IActionResult> UpdateOrganizationHighlights(int orgId, [FromBody] List<HighlightDTO> highlights)
        {
            if (highlights == null || highlights.Count == 0)
                return BadRequest(new { message = "No highlights provided." });

            try
            {
                await _adminService.UpdateOrganizationHighlightsAsync(orgId, highlights);
                return Ok(new { message = "Organization highlights updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization highlights.");
                return StatusCode(500, new { message = "An error occurred while updating organization highlights." });
            }
        }

        [HttpPost("organization/{orgId}/events")]
        public async Task<IActionResult> CreateEvent(int orgId, [FromForm] EventCreateRequest request)
        {
            if (request == null)
                return BadRequest(new { message = "Invalid event data." });

            try
            {
                var eventDto = new EventCreateDTO
                {
                    EventName = request.EventName,
                    When = request.When,
                    Where = request.Where,
                    Platform = request.Platform,
                    Location = request.Location,
                    ParticipantsCount = request.ParticipantsCount,
                    EventDetails = request.EventDetails,
                    Topic = request.Topic,
                    Exclusivity = request.Exclusivity,
                    Picture = request.Picture,
                    Organizer = request.Organizer,
                    Host = request.Host,
                    FreeOrPaid = request.FreeOrPaid,
                    Cost = request.Cost
                };

                await _adminService.CreateEventAsync(orgId, eventDto);
                return StatusCode(201, new { message = "Event created successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating event.");
                return StatusCode(500, new { message = "An error occurred while creating the event." });
            }
        }
    }

    public class OrganizationDetailsUpdateRequest
    {
        public string Organization { get; set; }
        public string College { get; set; }
        public string Email { get; set; }
    }

    public class EventCreateRequest
    {
        public string EventName { get; set; }
        public string When { get; set; }
        public string Where { get; set; }
        public string Platform { get; set; }
        public string Location { get; set; }
        public string ParticipantsCount { get; set; }
        public string EventDetails { get; set; }
        public string Topic { get; set; }
        public string Exclusivity { get; set; }
        public byte[] Picture { get; set; }
        public string Organizer { get; set; }
        public string Host { get; set; }
        public string FreeOrPaid { get; set; }
        public string Cost { get; set; }
    }
}
