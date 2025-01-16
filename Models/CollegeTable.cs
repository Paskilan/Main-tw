using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class CollegeTable
{
    public int CollegeId { get; set; }

    public string CollegeName { get; set; } = null!;

    public int OrgId { get; set; }

    public string OrganizationName { get; set; } = null!;

    public virtual ICollection<EventTable> EventTables { get; set; } = new List<EventTable>();

    public virtual OrgTable Org { get; set; } = null!;

    public virtual ICollection<StudentTable> StudentTables { get; set; } = new List<StudentTable>();
}
