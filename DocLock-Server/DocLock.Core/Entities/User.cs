using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

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
        public ICollection<UserFile> Files { get; set; }
        [Required]
        public ICollection<Role> Roles { get; set; }
        public bool IsActive { get; set; } = true;
    }

}
