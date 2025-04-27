namespace backend.Dtos
{
    public class SummaryInfo
    {
        public decimal TotalDistance { get; set; }
        public decimal TotalTime { get; set; }

        public int ValueAddedCount { get; set; }
        public int NonValueAddedCount { get; set; }

        public double ValueAddedPercentage { get; set; }
        public double NonValueAddedPercentage { get; set; }

        public List<ShapeSummary> Shapes { get; set; } = new(); // Uyarıyı çözer
    }
}
