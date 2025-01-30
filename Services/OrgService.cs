using System.Text.RegularExpressions;
using appdev.Models;
using appdev.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        public async Task<OrgResponse<OrgResponseDto>> CreateOrgAsync(CreateOrgDto createOrgDto, ClaimsPrincipal user)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var studentIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
                if (studentIdClaim == null)
                {
                    return new OrgResponse<OrgResponseDto>
                    {
                        Success = false,
                        Message = "Student ID not found in authentication token"
                    };
                }

                int studentId = int.Parse(studentIdClaim.Value);

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

                var admin = new AdminTable
                {
                    StudentId = studentId,
                    OrgId = org.OrgId,
                    OrgOwner = true
                };

                _context.Admins.Add(admin);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

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
                await transaction.RollbackAsync();
                var innerExceptionMessage = dbEx.InnerException?.Message ?? "No inner exception";
                return new OrgResponse<OrgResponseDto>
                {
                    Success = false,
                    Message = $"Database error: {innerExceptionMessage}"
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
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