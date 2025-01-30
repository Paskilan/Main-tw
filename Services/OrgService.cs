using System.Text.RegularExpressions;
using appdev.Models;
using appdev.DTOs;
using Microsoft.EntityFrameworkCore;
using static appdev.Controllers.OrgsController;
using appdev.Controllers;


namespace appdev.Services
{

    public class OrgService
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        public OrgService(ApplicationDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<OrgResponse<OrgResponseDto>> CreateOrgAsync(CreateOrgDto createOrgDto)
        {
            try
            {
                if (await _context.Orgs.AnyAsync(o => o.OrgName.ToLower() == createOrgDto.OrgName.ToLower()))
                {
                    return new OrgResponse<OrgResponseDto>
                    {
                        Success = false,
                        Message = "An organization with this name already exists"
                    };
                }

                if (createOrgDto.Verified && string.IsNullOrEmpty(createOrgDto.ControlNumber))
                {
                    return new OrgResponse<OrgResponseDto>
                    {
                        Success = false,
                        Message = "ControlNumber is required for verified organizations."
                    };
                }

                var org = new OrgTable
                {
                    OrgName = createOrgDto.OrgName,
                    OrgDescription = createOrgDto.Description,
                    CollegeId = createOrgDto.CollegeId,
                    OrgEmail = createOrgDto.Email,
                    OrgType = createOrgDto.Classification,
                    Verified = createOrgDto.Verified,
                    ControlNumber = createOrgDto.ControlNumber,
                    OrgApproved = false,
                    OrgLogo = Convert.FromBase64String(createOrgDto.ImageBase64),
                    OrgFacebook = createOrgDto.OrgFacebook ?? "",
                    OrgInstagram = createOrgDto.OrgInstagram ?? "",
                    OrgLinkedIn = createOrgDto.OrgLinkedIn ?? ""
                };

                _context.Orgs.Add(org);
                await _context.SaveChangesAsync();

                var orgDto = MapToResponseDto(org);

                return new OrgResponse<OrgResponseDto>
                {
                    Success = true,
                    Message = "Organization created successfully",
                    Data = orgDto
                };
            }
            catch (DbUpdateException dbEx)
            {
                var innerExceptionMessage = dbEx.InnerException?.Message ?? "No inner exception";
                return new OrgResponse<OrgResponseDto>
                {
                    Success = false,
                    Message = $"An error occurred: {innerExceptionMessage}"
                };
            }
            catch (Exception ex)
            {
                return new OrgResponse<OrgResponseDto>
                {
                    Success = false,
                    Message = $"An error occurred: {ex.Message}"
                };
            }
        }

        private OrgResponseDto MapToResponseDto(OrgTable org)
        {
            return new OrgResponseDto
            {
                Id = org.OrgId,
                Name = org.OrgName,
                Description = org.OrgDescription,
                CollegeId = org.CollegeId ?? 0,
                ImageUrl = $"data:image/png;base64,{Convert.ToBase64String(org.OrgLogo)}",
                Verified = org.Verified,
                Email = org.OrgEmail,
                Classification = org.OrgType,
                ControlNumber = org.ControlNumber
            };
        }
    }
}


