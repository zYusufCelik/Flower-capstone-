namespace backend.Dtos
{
    public class ShapeSummary
    {
        public string Name { get; set; } = null!;
        public string Shape { get; set; } = null!;
        public int Count { get; set; }
        public double Percentage { get; set; }
    }
}
