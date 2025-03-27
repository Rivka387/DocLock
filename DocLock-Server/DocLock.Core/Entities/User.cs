using System.ComponentModel;
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
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        public ICollection<UserFile> Files { get; set; } = new List<UserFile>();
        [Required]
        public ICollection<Role> Roles { get; set; } = new HashSet<Role>();
        public bool IsActive { get; set; } = true;

        // public DateOnly CreatedAt { get; set; }
    }

}
