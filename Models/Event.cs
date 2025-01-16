namespace appdev.Models
{
    public class Event
    {
        public int EventID { get; set; }
        public string? EventName { get; set; }
        public int OrgID { get; set; }
        public string? OrgName { get; set; }
        public int RSVPCount { get; set; }
        public string? EventHost { get; set; }
        public string? EventDescription { get; set; }
        public byte[]? EventHeader { get; set; }
        public DateOnly EventDate { get; set; }
        public string? EventMode { get; set; }
        public string? EventLocation { get; set;}
        public char EventState { get; set; }
        public int CollegeId { get; set; }
        public string? EventRegistration { get; set; }
            


    }
}
