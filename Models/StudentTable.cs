using System;

using System.Collections.Generic;

namespace appdev.Models;

public partial class StudentTable
{
    public int StudentId { get; set; }

    public string StudentFirstName { get; set; } = null!;
    public string StudentLastName { get; set; } = null!;
    public string StudentEmail { get; set; } = null!;
    public string StudentPassword { get; set; } = null!;
    public int CollegeId { get; set; }
    public byte[] StudentProfilePicture { get; set; } = null!;
    public int OrgCount { get; set; }
    public string OrgAdmin { get; set; } = null!;

    public virtual CollegeTable CollegeName { get; set; } = null!;

    public virtual CollegeTable College { get; set; } = null!;
    public virtual ICollection<AdminTable> AdminTables { get; set; } = new List<AdminTable>();
    public virtual ICollection<FollowedOrgsTable> FollowedOrgsTables { get; set; } = new List<FollowedOrgsTable>();
}
