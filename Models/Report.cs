namespace appdev.Models
{
    public class Report
    {
        public int ReportID { get; set; }
        public int EventID  { get; set; }
        public int OrgID { get; set; }
        public string? ReportClassification { get; set; }
    }
}
