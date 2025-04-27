using System;
using System.Linq;
using System.Collections.Generic;
using backend.Models;
using backend.Dtos;

namespace backend.Helpers
{
    public static class ChartSummaryHelper
    {
        public static SummaryInfo GenerateSummary(Chart chart)
        {
            int total = chart.Processes.Count;
            decimal totalDistance = chart.Processes.Sum(p => p.Distance ?? 0);
            decimal totalTime = chart.Processes.Sum(p => p.Time ?? 0);
            int valueAdded = chart.Processes.Count(p => p.ValueAdded == true);
            int nonValueAdded = chart.Processes.Count(p => p.NonValueAdded == true);

            var shapeGroups = chart.Processes
                .GroupBy(p => p.Shape)
                .Select(g => new ShapeSummary
                {
                    Shape = g.Key ?? "unknown",
                    Name = GetShapeName(g.Key ?? ""),
                    Count = g.Count(),
                    Percentage = total > 0 ? Math.Round((double)g.Count() / total * 100, 2) : 0
                })
                .ToList();

            return new SummaryInfo
            {
                TotalDistance = totalDistance,
                TotalTime = totalTime,
                ValueAddedCount = valueAdded,
                NonValueAddedCount = nonValueAdded,
                ValueAddedPercentage = total > 0 ? Math.Round((double)valueAdded / total * 100, 2) : 0,
                NonValueAddedPercentage = total > 0 ? Math.Round((double)nonValueAdded / total * 100, 2) : 0,
                Shapes = shapeGroups
            };
        }

        private static string GetShapeName(string shape)
        {
            return shape switch
            {
                "circle" => "Operation",
                "square" => "Inspection",
                "arrow" => "Transportation",
                "half" => "Delay",
                "triangle" => "Storage",
                _ => "Unknown"
            };
        }
    }
}
