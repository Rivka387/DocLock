using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.DTOS
{

    public class PermissionDto
    {
        public int Id { get; set; }

        public string PermissionName { get; set; }

        public string Description { get; set; }
    }

}
