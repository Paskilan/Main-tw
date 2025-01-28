using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class AdminTable
{
    public int AdminId { get; set; }

    public int OrgId { get; set; }

    public int StudentId { get; set; }

    public string AdminName { get; set; } = null!;

    public string OrgOwner { get; set; } = null!;

    public virtual OrgTable Org { get; set; } = null!;

    public virtual StudentTable Student { get; set; } = null!;
}
