using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;

namespace DocLock.Core.IServices
{
    public interface IEmailService
    {
        public Task SendEmailAsync(EmailRequest request);
    }
}
