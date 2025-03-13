using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.Entities
{
    //public enum Role {ADMIN, USER}
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public List<int> FilesId { get; set; }
        public ICollection<Role>? Roles { get; set; }
        public bool IsActive { get; set; } = true;

        // public DateOnly CreatedAt { get; set; }
    }
}
