namespace backend.Dtos;

public class ProcessRequestDto
{
    public string? ProcessName { get; set; } 
    public string? Shape { get; set; } 
    public decimal? Time { get; set; } 
    public decimal? Distance { get; set; }
    public bool? ValueAdded { get; set; } 
    public bool? NonValueAdded { get; set; } 
}
