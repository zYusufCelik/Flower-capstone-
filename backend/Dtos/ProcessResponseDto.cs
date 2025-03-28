namespace backend.Dtos;

public class ProcessResponseDto
{
    public int Id { get; set; } 
    public string? ProcessName { get; set; }
    public string? Shape { get; set; } 
    public decimal? Time { get; set; }
    public decimal? Distance { get; set; }
    public bool? ValueAdded { get; set; } 
    public bool? NonValueAdded { get; set; } 

    public string? ChartName {get;set;}
}
