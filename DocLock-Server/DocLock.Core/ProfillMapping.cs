﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;

namespace DocLock.Core
{
    public class ProfileMapping:Profile
    {
        public ProfileMapping()
        {
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<UserFile, UserFileDto>().ReverseMap();
            CreateMap<Permission, PermissionDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();    
            CreateMap<User, UserDto>();
            CreateMap<UserDto,User> ();
        }
    }
}

