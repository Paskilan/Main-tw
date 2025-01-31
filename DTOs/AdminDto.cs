
namespace appdev.DTOs
{
    public class OrganizationDTO
    {
        public int OrgId { get; set; }
        public orgDetailsDTO OrgDetails { get; set; }
        public string Name { get; set; }
        public int CollegeId { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string Classification { get; set; }  
        public string CollegeName { get; set; }    
        public SocialMediaDTO Socials { get; set; }
        public string ImageUrl { get; set; }
        public string HeaderImageUrl { get; set; } 
        public bool IsVerified { get; set; }
        public int FollowerCount { get; set; }
        public List<EventDTO> UpcomingEvents { get; set; }
        public List<EventDTO> PastEvents { get; set; }
        public List<HighlightDTO> Highlights { get; set; }
        public List<AdminDTO> Admins { get; set; }
    }

    public class orgDetailsDTO
    {
    public string Name { get; set; }
    public string Email { get; set; }
    public string CollegeName { get; set; }
    public SocialMediaDTO Socials { get; set; }
    }


    public class EventCreateDTO
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

    public class SocialMediaDTO
    {
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string LinkedIn { get; set; }
    }

    public class EventDTO
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string When { get; set; }
        public string Where { get; set; } 
        public string Platform { get; set; }
        public string Location { get; set; }
        public string ParticipantsCount { get; set; }  
        public string EventDetails { get; set; }
        public string Topic { get; set; }
        public string Exclusivity { get; set; } 
        public string ImageUrl { get; set; }
        public string Organizer { get; set; }
        public string Host { get; set; }
        public string FreeOrPaid { get; set; }  
        public string RegistrationLink { get; set; }
        public string Cost { get; set; }
        public int RsvpCount { get; set; }
    }

    public class HighlightDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }

    public class AdminDTO
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
    public class AdminUpdateDTO
    {
        public List<AdminDTO> Admins { get; set; }
    }
    public class HighlightUpdateDTO
    {
        public List<HighlightDTO> Highlights { get; set; }
    }
}