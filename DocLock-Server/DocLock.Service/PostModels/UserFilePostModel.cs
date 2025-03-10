using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Service.PostModels
{
    public class UserFilePostModel
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int OwnerId { get; set; }
        public string FilePassword { get; set; }
    }
}
