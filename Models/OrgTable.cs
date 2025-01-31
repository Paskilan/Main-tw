using System;
using System.Collections.Generic;

namespace appdev.Models
{
    public partial class OrgTable
    {
        public int OrgId { get; set; }
        public string OrgName { get; set; } = null!;
        public string OrgEmail { get; set; } = null!;
        public string OrgDescription { get; set; } = null!;
        public string OrgType { get; set; } = null!;
        public string? OrgFacebook { get; set; } 
        public string? OrgInstagram { get; set; } 
        public string? OrgLinkedIn { get; set; } 
        public byte[] OrgLogo { get; set; } = null!;
        public byte[] OrgHeader { get; set; } = null!;
        public bool Verified { get; set; } = false;
        public int? CollegeId { get; set; }
        public bool OrgApproved { get; set; } = false;
        public virtual CollegeTable? College { get; set; } = null!;

        // Navigation properties
        public virtual ICollection<AdminTable> AdminTables { get; set; } = new List<AdminTable>();
        public virtual ICollection<EventTable> EventTables { get; set; } = new List<EventTable>();
        public virtual ICollection<FollowedOrgsTable> FollowedOrgsTables { get; set; } = new List<FollowedOrgsTable>();
        public virtual ICollection<OrgHighlightsTable> OrgHighlightsTables { get; set; } = new List<OrgHighlightsTable>();

        // Additional fields
        public string? ControlNumber { get; set; } 
        public int FollowerCount { get; set; }

        public virtual ICollection<ReportTable> ReportTables { get; set; } = new List<ReportTable>();
    }
}
