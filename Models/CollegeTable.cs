
﻿using appdev.Models;
﻿using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class CollegeTable
{
    public int CollegeId { get; set; }
    public string CollegeName { get; set; } = null!;
    public virtual ICollection<OrgTable> OrgTables { get; set; } = new List<OrgTable>();
    public virtual ICollection<StudentTable> StudentTables { get; set; } = new List<StudentTable>();
    public virtual ICollection<EventTable> EventTables { get; set; } = new List<EventTable>();
}

