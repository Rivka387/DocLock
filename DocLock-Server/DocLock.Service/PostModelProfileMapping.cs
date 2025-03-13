using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Service.PostModels;

namespace DocLock.Service
{
    public class PostModelProfileMapping : Profile
    {
        public PostModelProfileMapping()
        {
            CreateMap<UserPostModel, UserDto>().ReverseMap();
            CreateMap<UserFilePostModel, UserFilePostModel >().ReverseMap();

        }
    }
}
