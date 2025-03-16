using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;

namespace DocLock.Core.DTOS
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
      //  public Role Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> FilesId { get; set; }
     //   public ICollection<Role>? Roles { get; set; }

        public bool IsActive { get; set; }

    }
}
