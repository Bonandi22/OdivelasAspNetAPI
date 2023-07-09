using AutoMapper;
using IcmOdivelas.WebAPI.Dtos;
using IcmOdivelas.WebAPI.Model;

namespace IcmOdivelas.WebAPI.Profiles
{
    public class IcmOdivelasProfile: Profile
    {
        public IcmOdivelasProfile()
    {
        CreateMap<Member, MemberDto>();
        CreateMap<MemberDto, Member>();
    }
    }
}