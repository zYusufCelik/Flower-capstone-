namespace backend.Dtos;

public class ChartResponseDto
{
    public int Id { get; set; } 
    public string? Name { get; set; } 
    public List<ProcessRequestDto> Processes { get; set; } = new List<ProcessRequestDto>(); 
    public string? Summary { get; set; } 
}