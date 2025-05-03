namespace backend.Dtos{
    
    public class StepDto
{
    public string StepName { get; set; } = string.Empty;
    public string Shape { get; set; } = string.Empty;
    public decimal? Distance { get; set; }
    public decimal? Time { get; set; }
    public string ValueType { get; set; } = string.Empty;
}

}