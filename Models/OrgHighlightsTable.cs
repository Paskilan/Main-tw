using System;
using System.Collections.Generic;

namespace appdev.Models;

public partial class OrgHighlightsTable
{
    public int OrgHighlightsId { get; set; }

    public int OrgId { get; set; }

    public string OrgHighlightsTitle { get; set; } = null!;

    public string OrgHighlightsDescription { get; set; } = null!;
    public byte[] OrgHighlightsImage { get; set; } = null!;

    public virtual OrgTable Org { get; set; } = null!;
}
