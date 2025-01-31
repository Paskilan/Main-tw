using Microsoft.AspNetCore.Mvc;
using appdev.DTOs;
using appdev.Services;
using static appdev.Services.AdminService;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

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

        [HttpGet("{orgId}")]
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

        [HttpPut("{orgId}/description")]
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

        [HttpPut("{orgId}/details")]
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

        [HttpPut("{orgId}/socials")]
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

        [HttpPut("{orgId}/logo")]
        public async Task<IActionResult> UpdateOrganizationLogo(int orgId, [FromBody] ImageUploadRequest request)
        {
            if (string.IsNullOrEmpty(request?.Image))
                return BadRequest(new { message = "No image data provided" });

            try
            {
                var imageBytes = Convert.FromBase64String(request.Image);
                await _adminService.UpdateOrganizationLogoAsync(orgId, imageBytes);
                return Ok(new { message = "Logo updated successfully" });
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid Base64 format" });
            }
        }

        [HttpPut("{orgId}/header")]
        public async Task<IActionResult> UpdateOrganizationHeader(int orgId, IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest(new { message = "No file uploaded." });

            try
            {
                using var memoryStream = new MemoryStream();
                await image.CopyToAsync(memoryStream);
                var imageData = memoryStream.ToArray();

                await _adminService.UpdateOrganizationHeaderAsync(orgId, imageData);
                return Ok(new { message = "Organization header updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization header.");
                return StatusCode(500, new { message = "An error occurred while updating organization header." });
            }
        }

        [HttpPut("{orgId}/highlights")]
        public async Task<IActionResult> UpdateOrganizationHighlights(int orgId, [FromBody] List<HighlightDTO> highlights, IFormFile image)
        {
            if (highlights == null || highlights.Count == 0)
                return BadRequest(new { message = "No highlights provided." });

            try
            {
                using var memoryStream = new MemoryStream();
                await image.CopyToAsync(memoryStream);
                var imageData = memoryStream.ToArray();
                // Add a return statement here
                return Ok(new { message = "Highlights updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating organization highlights.");
                return StatusCode(500, new { message = "An error occurred while updating organization highlights." });
            }
        }

        [HttpPost("{orgId}/events")]
        public async Task<IActionResult> CreateEvent(int orgId, [FromForm] EventCreateRequest request)
        {
            try
            {
                byte[] pictureBytes = null;
                if (request.Picture != null)
                {
                    using var memoryStream = new MemoryStream();
                    await memoryStream.WriteAsync(request.Picture);
                    pictureBytes = memoryStream.ToArray();
                }

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
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
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
