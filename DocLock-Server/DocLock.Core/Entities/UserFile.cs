using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;

namespace DocLock.Core.Entities
{
    public class UserFile
    {
        [Key]

        public int Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string FileName { get; set; }
        [Required]
        public int OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public User User { get; set; }
        [Required]
        public string FileLink { get; set; }
        [Required]
        public string EncryptedFileLink { get; set; }
        [Required]
        public string FilePassword { get ; set; }
        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public bool IsActive { get; set; } = true;


    }
}
