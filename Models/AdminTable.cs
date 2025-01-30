using System;
using System.Collections.Generic;

namespace appdev.Models;

public class AdminTable
{
    public int OrgId { get; set; }
    public int StudentId { get; set; }
    public bool OrgOwner { get; set; } 
    public OrgTable Org { get; set; }
    public StudentTable Student { get; set; }
}
