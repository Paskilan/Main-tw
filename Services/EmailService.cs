using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;

namespace appdev.Services
{
    public class EmailService
    {
        private readonly EmailConfiguration _emailConfig;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailConfiguration> emailConfig, ILogger<EmailService> logger)
        {
            _emailConfig = emailConfig.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
        {
            try
            {
                using var message = new MailMessage
                {
                    From = new MailAddress(_emailConfig.FromEmail, _emailConfig.FromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };
                message.To.Add(to);

                using var client = new SmtpClient(_emailConfig.SmtpServer, _emailConfig.SmtpPort)
                {
                    Credentials = new NetworkCredential(_emailConfig.SmtpUsername, _emailConfig.SmtpPassword),
                    EnableSsl = true
                };

                await client.SendMailAsync(message);
                _logger.LogInformation("Email sent successfully to {EmailAddress}", to);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {EmailAddress}", to);
                throw new ApplicationException("Failed to send email", ex);
            }
        }

        public async Task SendOrgApprovalRequestEmailAsync(string orgName, string orgEmail, string description)
        {
            var subject = $"New Organization Registration Request: {orgName}";
            var body = $@"
                <h2>New Organization Registration Request</h2>
                <p>A new organization has requested approval:</p>
                <ul>
                    <li><strong>Organization Name:</strong> {orgName}</li>
                    <li><strong>Contact Email:</strong> {orgEmail}</li>
                    <li><strong>Description:</strong> {description}</li>
                </ul>
                <p>Please review this request in the admin dashboard.</p>";

            await SendEmailAsync(_emailConfig.AdminEmail, subject, body, true);
        }

        public async Task SendOrgApprovalStatusEmailAsync(string orgEmail, string orgName, bool isApproved, string? rejectionReason = null)
        {
            var subject = $"Organization Registration Status: {orgName}";
            var body = isApproved
                ? $@"
                    <h2>Organization Approved</h2>
                    <p>Congratulations! Your organization {orgName} has been approved.</p>
                    <p>You can now access all features of the platform.</p>"
                : $@"
                    <h2>Organization Registration Update</h2>
                    <p>Your organization registration for {orgName} requires additional review.</p>
                    <p>Reason: {rejectionReason ?? "No specific reason provided."}</p>
                    <p>Please contact the administration for more information.</p>";

            await SendEmailAsync(orgEmail, subject, body, true);
        }
    }

    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body, bool isHtml = false);
        Task SendOrgApprovalRequestEmailAsync(string orgName, string orgEmail, string description);
        Task SendOrgApprovalStatusEmailAsync(string orgEmail, string orgName, bool isApproved, string? rejectionReason = null);
    }

    public class EmailConfiguration
    {
        public string SmtpServer { get; set; } = string.Empty;
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; } = string.Empty;
        public string SmtpPassword { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
        public string AdminEmail { get; set; } = string.Empty;
    }
}