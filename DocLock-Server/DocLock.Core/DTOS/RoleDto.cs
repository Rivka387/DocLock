using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.DTOS
{
    public class RoleDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string RoleName { get; set; }

        public string Description { get; set; }



    }
}
