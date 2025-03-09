using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.Entities
{
    public class UserFile
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public User User { get; set; }
        public int OwnerId { get; set; }
        public string FileLink { get; set; }
        public string EncryptedFileLink { get; set; }
        public string FilePassword { get; set; }
        public DateOnly CreatedAt { get; set; }

    }
}
