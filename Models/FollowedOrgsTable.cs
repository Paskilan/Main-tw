using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class FollowedOrgsTable
{
    public int StudentId { get; set; }

    public int OrgId { get; set; }

    public string OrgName { get; set; } = null!;

    public virtual OrgTable Org { get; set; } = null!;

    public virtual StudentTable Student { get; set; } = null!;
}
