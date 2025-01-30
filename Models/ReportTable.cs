using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class ReportTable
{
    public int ReportId { get; set; }

    public int EventId { get; set; }

    public int OrgId { get; set; }

    public string ReportClassification { get; set; } = null!;

    public virtual EventTable Event { get; set; } = null!;

    public virtual OrgTable Org { get; set; } = null!;
}
