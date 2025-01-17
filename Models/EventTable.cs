using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class EventTable
{
    public int EventId { get; set; }

    public string EventName { get; set; } = null!;

    public int OrgId { get; set; }

    public string OrgName { get; set; } = null!;

    public int Rsvpcount { get; set; }

    public string EventHost { get; set; } = null!;

    public string EventDescription { get; set; } = null!;

    public byte[] EventHeader { get; set; } = null!;

    public DateOnly EventDate { get; set; }

    public string EventMode { get; set; } = null!;

    public string EventLocation { get; set; } = null!;

    public string EventState { get; set; } = null!;

    public int CollegeId { get; set; }

    public string EventRegistration { get; set; } = null!;

    public virtual CollegeTable College { get; set; } = null!;

    public virtual OrgTable Org { get; set; } = null!;

    public virtual ICollection<ReportTable> ReportTables { get; set; } = new List<ReportTable>();
}
