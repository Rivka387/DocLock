using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.Entities
{
    public enum Role {ADMIN, USER}
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> FilesId { get; set; }

       // public DateOnly CreatedAt { get; set; }
    }
}
