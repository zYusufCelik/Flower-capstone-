using AutoMapper;
using backend.Dtos;
using backend.Models;

namespace backend.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapping from ChartRequestDto to Chart
        CreateMap<ChartRequestDto, Chart>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        // Mapping from Chart to ChartResponseDto
        CreateMap<Chart, ChartResponseDto>()
            .ForMember(dest => dest.Summary, opt => opt.Ignore()); // You might want to compute summary dynamically

        // Mapping from ProcessRequestDto to Process
        CreateMap<ProcessRequestDto, Process>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.ChartId, opt => opt.Ignore())
            .ForMember(dest => dest.Chart, opt => opt.Ignore());

        // Mapping from Process to ProcessResponseDto
        CreateMap<Process, ProcessResponseDto>()
            .ForMember(dest => dest.ChartName, opt => opt.MapFrom(src => src.Chart.Name));
    }
}