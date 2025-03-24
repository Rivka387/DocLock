using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;

namespace DocLock.Core.DTOS
{
    public class UserActivityLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public string ActionType { get; set; } // סוג הפעולה ("Upload", "Download", "Login" וכו')

        public int? FileId { get; set; } // אם הפעולה קשורה לקובץ
        [ForeignKey("FileId")]
        public UserFile File { get; set; }

        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow; // חותמת זמן
    }
}
