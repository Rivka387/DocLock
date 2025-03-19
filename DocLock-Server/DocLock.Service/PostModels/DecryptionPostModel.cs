using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Service.PostModels
{
    public class DecryptionPostModel
    {
        public string EncryptedLink { get; set; }
        public string Password { get; set; }
    }
}
