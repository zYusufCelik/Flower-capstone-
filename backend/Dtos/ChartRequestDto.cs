namespace backend.Dtos;


// yeni chart oluşturulurken gönderilen veri    
public class ChartRequestDto
{
    public string? Name { get; set; } // Chart adını alır.
    public List<ProcessRequestDto> Processes { get; set; } = new List<ProcessRequestDto>(); // Chart ile ilişkili Process'ler
}

