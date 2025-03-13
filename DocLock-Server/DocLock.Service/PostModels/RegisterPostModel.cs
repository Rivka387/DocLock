using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;

namespace DocLock.Service.PostModels
{
    public class RegisterPostModel
    {
        public UserDto User { get; set; }
        public string[] Roles { get; set; }
    }
}
