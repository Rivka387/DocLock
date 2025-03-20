using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using DocLock.Core.IServices;
using Microsoft.Extensions.Configuration;
using Amazon.SimpleEmail.Model;
using Amazon.SimpleEmail;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
namespace DocLock.Service.Services
{

    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task<bool> SendEmailAsync(EmailRequest request)
        {



            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("DocLock", configuration["GOOGLE_USER_EMAIL"]));
            emailMessage.To.Add(new MailboxAddress(request.To, request.To));
            emailMessage.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder { TextBody = request.Body };
            emailMessage.Body = bodyBuilder.ToMessageBody();



            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(configuration["SMTP_SERVER"], int.Parse(configuration["PORT"]), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(configuration["GOOGLE_USER_EMAIL"], configuration["PASSWORD"]);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

        }

     
    }
}