using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.DTOS
{
    public class UserFileDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int OwnerId { get; set; }
        public string FileLink { get; set; }
        public string EncryptedFileLink { get; set; }
        public string FilePassword { get; set; }
        public DateOnly CreatedAt { get; set; }
    }
}
