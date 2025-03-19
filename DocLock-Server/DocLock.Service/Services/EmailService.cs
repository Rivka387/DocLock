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


namespace DocLock.Service.Services
{

    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task SendEmailAsync(EmailRequest request)
        {
            var client = new AmazonSimpleEmailServiceClient(configuration["AWS_ACCESS_KEY_ID"], configuration["AWS_SECRET_ACCESS_KEY"], Amazon.RegionEndpoint.GetBySystemName(configuration["AWS_REGION"]));

            var sendRequest = new SendEmailRequest
            {
                Source = "R0548547387@gmail.com", // כתובת המייל שאימתת ב-SES
                Destination = new Destination
                {
                    ToAddresses = new List<string> { request.To } // נמען
                },
                Message = new Message
                {
                    Subject = new Content(request.Subject),
                    Body = new Body
                    {
                        Text = new Content(request.Body)
                    }
                }
            };

            try
            {
                var response = await client.SendEmailAsync(sendRequest);
                Console.WriteLine("המייל נשלח בהצלחה! Message ID: " + response.MessageId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("שגיאה בשליחת מייל: " + ex.Message);
            }
        }



    }

}
