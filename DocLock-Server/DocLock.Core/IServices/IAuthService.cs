using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.IServices
{
    public interface IAuthService
    {
        public string GenerateJwtToken(string username, string[] roles);
    }
}
