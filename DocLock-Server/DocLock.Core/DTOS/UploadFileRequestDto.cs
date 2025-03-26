using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DocLock.Core.DTOS
{
    public class UploadFileRequestDto
    {
        public IFormFile File { get; set; }
        public string FileName { get; set; }
        public string Password { get; set; }
        public string FileType { get; set; }
    }
}
