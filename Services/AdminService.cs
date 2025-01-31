using appdev.Models;
using appdev.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Azure.Core;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;

namespace appdev.Services
{
    public interface IAdminService
    {
        Task<OrganizationDTO> GetOrganizationDetailsAsync(int orgId);
        Task UpdateOrganizationDescriptionAsync(int orgId, string description);
        Task UpdateOrganizationSocialsAsync(int orgId, string facebook, string instagram, string linkedin);
        Task UpdateOrganizationImagesAsync(int orgId, byte[] logo, byte[] header);
        Task UpdateOrganizationDetailsAsync(int orgId, string Organization, string College, string Email);
        Task UpdateOrganizationSocialsAsync(int orgId, List<SocialMediaDTO> socials);
        Task UpdateOrganizationLogoAsync(int orgId, byte[] image);
        Task UpdateOrganizationHeaderAsync(int orgId, byte[] image);
        Task UpdateOrganizationHighlightsAsync(int orgId, List<HighlightDTO> highlights);
        Task<List<EventDTO>> GetUpcomingEventsAsync(int orgId);
        Task<List<EventDTO>> GetPastEventsAsync(int orgId);
        Task CreateEventAsync(int orgId, EventDTO eventDto);
        Task UpdateAdminsAsync(int orgId, List<AdminDTO> admins);
    }

    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OrganizationDTO> GetOrganizationDetailsAsync(int orgId)
        {
            var org = await _context.Orgs
                .Include(o => o.EventTables)
                .Include(o => o.OrgHighlightsTables)
                .Include(o => o.AdminTables)
                .FirstOrDefaultAsync(o => o.OrgId == orgId);

            if (org == null)
                throw new NotFoundException("Organization not found");

            return new OrganizationDTO
            {
                OrgId = org.OrgId,
                Name = org.OrgName,
                Email = org.OrgEmail,
                Description = org.OrgDescription,
                Classification = org.OrgType,
                Socials = new SocialMediaDTO
                {
                    Facebook = org.OrgFacebook,
                    Instagram = org.OrgInstagram,
                    LinkedIn = org.OrgLinkedIn
                },
                ImageUrl = Convert.ToBase64String(org.OrgLogo),
                HeaderImageUrl = Convert.ToBase64String(org.OrgHeader),
                CollegeName = org.College?.CollegeName,
                IsVerified = org.Verified,
                CollegeId = org.CollegeId ?? 0,
                FollowerCount = org.FollowerCount,
                UpcomingEvents = await GetUpcomingEventsAsync(orgId),
                PastEvents = await GetPastEventsAsync(orgId),
                Highlights = org.OrgHighlightsTables.Select(h => new HighlightDTO
                {
                    Id = h.OrgHighlightsId,
                    Title = h.OrgHighlightsTitle,
                    Description = h.OrgHighlightsDescription,
                    ImageUrl = Convert.ToBase64String(h.OrgHighlightsImage)
                }).ToList()
            };
        }

        public async Task UpdateOrganizationDescriptionAsync(int orgId, string description)
        {
            var org = await _context.Orgs.FindAsync(orgId);
            if (org == null)
                throw new NotFoundException("Organization not found");

            org.OrgDescription = description;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrganizationDetailsAsync(int orgId, string Organization, string College, string Email)
        {
            var org = await _context.Orgs.FindAsync(orgId);
            if (org == null)
                throw new NotFoundException("Organization not found");

            org.OrgName = Organization;
            org.College = new CollegeTable { CollegeName = College };
            org.OrgEmail = Email;
            await _context.SaveChangesAsync();
        }

        public async Task<List<EventDTO>> GetUpcomingEventsAsync(int orgId)
        {
            var currentDate = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Events
                .Where(e => e.OrgId == orgId && e.EventDate >= currentDate)
                .OrderBy(e => e.EventDate)
                .Select(e => new EventDTO
                {
                    EventId = e.EventId,
                    EventName = e.EventName,
                    EventDetails = e.EventDescription,
                    When = e.EventDate.ToString(),
                    Platform = e.EventMode,
                    Location = e.EventLocation,
                    Host = e.EventHost,
                    ImageUrl = Convert.ToBase64String(e.EventHeader),
                    RsvpCount = e.Rsvpcount,
                    RegistrationLink = e.EventRegistration
                })
                .ToListAsync();
        }

        public async Task<List<EventDTO>> GetPastEventsAsync(int orgId)
        {
            var currentDate = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Events
                .Where(e => e.OrgId == orgId && e.EventDate < currentDate)
                .OrderByDescending(e => e.EventDate)
                .Select(e => new EventDTO
                {
                    EventId = e.EventId,
                    EventName = e.EventName,
                    EventDetails = e.EventDescription,
                    When = e.EventDate.ToString(),
                    Platform = e.EventMode,
                    Location = e.EventLocation,
                    Host = e.EventHost,
                    ImageUrl = Convert.ToBase64String(e.EventHeader),
                    RsvpCount = e.Rsvpcount,
                    RegistrationLink = e.EventRegistration
                })
                .ToListAsync();
        }

        public async Task CreateEventAsync(int orgId, EventDTO eventDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var org = await _context.Orgs.FindAsync(orgId);
                if (org == null)
                    throw new NotFoundException("Organization not found");

                var newEvent = new EventTable
                {
                    OrgId = orgId,
                    EventName = eventDto.EventName,
                    EventDescription = eventDto.EventDetails,
                    EventDate = DateOnly.Parse(eventDto.When),
                    EventMode = eventDto.Platform,
                    EventLocation = eventDto.Location,
                    EventHost = eventDto.Host,
                    EventHeader = Convert.FromBase64String(eventDto.ImageUrl),
                    Rsvpcount = eventDto.RsvpCount,
                    EventRegistration = eventDto.RegistrationLink,
                    OrgName = org.OrgName
                };

                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task UpdateOrganizationSocialsAsync(int orgId, string facebook, string instagram, string linkedin)
        {
            var org = await _context.Orgs.FindAsync(orgId);
            if (org == null)
                throw new NotFoundException("Organization not found");

            org.OrgFacebook = facebook;
            org.OrgInstagram = instagram;
            org.OrgLinkedIn = linkedin;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrganizationImagesAsync(int orgId, byte[] logo, byte[] header)
        {
            var org = await _context.Orgs.FindAsync(orgId);
            if (org == null)
                throw new NotFoundException("Organization not found");

            org.OrgLogo = logo;
            org.OrgHeader = header;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrganizationHighlightsAsync(int orgId, List<HighlightDTO> highlights)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var org = await _context.Orgs
                    .Include(o => o.OrgHighlightsTables)
                    .FirstOrDefaultAsync(o => o.OrgId == orgId);

                if (org == null)
                    throw new NotFoundException("Organization not found");

                _context.OrgHighlights.RemoveRange(org.OrgHighlightsTables);

                foreach (var highlight in highlights)
                {
                    org.OrgHighlightsTables.Add(new OrgHighlightsTable
                    {
                        OrgId = orgId,
                        OrgHighlightsTitle = highlight.Title,
                        OrgHighlightsDescription = highlight.Description,
                        OrgHighlightsImage = Convert.FromBase64String(highlight.ImageUrl)
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task UpdateAdminsAsync(int orgId, List<AdminDTO> admins)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var org = await _context.Orgs
                    .Include(o => o.AdminTables)
                    .FirstOrDefaultAsync(o => o.OrgId == orgId);

                if (org == null)
                    throw new NotFoundException("Organization not found");

                _context.Admins.RemoveRange(org.AdminTables);

                foreach (var admin in admins)
                {
                    var student = await _context.Students
                        .FirstOrDefaultAsync(s => s.StudentId == admin.StudentId);

                    if (student == null)
                        throw new NotFoundException($"Student with ID {admin.StudentId} not found");
                }

                foreach (var admin in admins)
                {
                    org.AdminTables.Add(new AdminTable
                    {
                        OrgId = orgId,
                        StudentId = admin.StudentId
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public class NotFoundException : Exception
        {
            public NotFoundException(string message) : base(message)
            {
            }
        }
    }
}