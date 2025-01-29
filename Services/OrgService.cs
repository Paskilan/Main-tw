using System.Text.RegularExpressions;
using appdev.Models;
using appdev.DTOs;
using Microsoft.EntityFrameworkCore;

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

        public async Task<OrgTable> CreateOrgAsync(CreateOrgDto createOrgDto, int collegeId)
        {
            if (await _context.Orgs.AnyAsync(o => o.OrgName.ToLower() == createOrgDto.Name.ToLower()))
            {
                throw new InvalidOperationException("An organization with this name already exists.");
            }

            var match = Regex.Match(createOrgDto.ImageUrl, @"data:image/(?<type>.+?);base64,(?<data>.+)");
            if (!match.Success) throw new InvalidOperationException("Invalid image format");
            var imageData = match.Groups["data"].Value;
            var org = new OrgTable
            {
                OrgName = createOrgDto.Name,
                OrgDescription = createOrgDto.Description,
                CollegeId = collegeId,
                OrgLogo = Convert.FromBase64String(imageData),
                Verified = "No",
                OrgEmail = createOrgDto.Email,
                OrgType = createOrgDto.Classification,
                ControlNumber = createOrgDto.ControlNumber
            };

            _context.Orgs.Add(org);
            await _context.SaveChangesAsync();

            await _emailService.SendOrgApprovalRequestEmailAsync(
            org.OrgName,
            createOrgDto.Email,
            org.OrgDescription
        );

            return org;
        }
        public async Task<OrgTable> UpdateOrgApprovalStatusAsync(int orgId, bool isApproved, string? rejectionReason = null)
        {
            var org = await _context.Orgs.FindAsync(orgId);
            if (org == null)
                throw new InvalidOperationException("Organization not found");

            org.Verified = isApproved ? "Yes" : "No";
            await _context.SaveChangesAsync();

            await _emailService.SendOrgApprovalStatusEmailAsync(
                org.OrgEmail,
                org.OrgName,
                isApproved,
                rejectionReason
            );

            return org;
        }
    }
    }

