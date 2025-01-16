using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class OrgTable
{
    public int OrgId { get; set; }

    public string OrgName { get; set; } = null!;

    public string Verified { get; set; } = null!;

    public int? ControlNumber { get; set; }

    public string OrgEmail { get; set; } = null!;

    public string OrgDescription { get; set; } = null!;

    public byte[]? OrgLogo { get; set; }

    public byte[]? OrgHeader { get; set; }

    public int FollowerCount { get; set; }

    public string OrgType { get; set; } = null!;

    public string OrgFacebook { get; set; } = null!;

    public string? OrgInstagram { get; set; }

    public string? OrgLinkedIn { get; set; }

    public virtual ICollection<AdminTable> AdminTables { get; set; } = new List<AdminTable>();

    public virtual ICollection<CollegeTable> CollegeTables { get; set; } = new List<CollegeTable>();

    public virtual ICollection<EventTable> EventTables { get; set; } = new List<EventTable>();

    public virtual ICollection<FollowedOrgsTable> FollowedOrgsTables { get; set; } = new List<FollowedOrgsTable>();

    public virtual ICollection<OrgHighlightsTable> OrgHighlightsTables { get; set; } = new List<OrgHighlightsTable>();

    public virtual ICollection<ReportTable> ReportTables { get; set; } = new List<ReportTable>();
}
