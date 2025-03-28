using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using AutoMapper;
using backend.Dtos;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(Program));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Veritabanı bağlantısı ve DbContext yapılandırma
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"), 
        ServerVersion.Parse("8.0.40-mysql")
    ));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
}

//Yeni chart 
app.MapPost("/saveChart", async (Chart chart, ApplicationDbContext dbContext, IMapper mapper) => {

    var chartDto = mapper.Map<ChartRequestDto>(chart);
    
    dbContext.Charts.Add(chart);
    await dbContext.SaveChangesAsync();

    return Results.Created($"/newChart/{chart.Id}", chartDto);
});

// Tüm Chartların dönmesi (test için yazılmıştır)
app.MapGet("/charts", async (ApplicationDbContext dbContext, IMapper mapper) =>
{
    var charts = await dbContext.Charts
        .Include(c => c.Processes)
        .ToListAsync();

    var chartDtos = mapper.Map<List<ChartResponseDto>>(charts);
    return Results.Ok(chartDtos);
});


// İçinde bulunduğun chart da new process dediğinde çalışan api 
app.MapPost("/newProcess/{chartId}", async (int chartId, ProcessRequestDto processDto, ApplicationDbContext dbContext, IMapper mapper) =>
{
    var chart = await dbContext.Charts.FindAsync(chartId);

    if (chart == null)
    {
        return Results.NotFound($"Chart with id {chartId} not found.");
    }

    var process = mapper.Map<Process>(processDto);
    process.ChartId = chartId;

    dbContext.Processes.Add(process);
    await dbContext.SaveChangesAsync();

    var processResponse = mapper.Map<ProcessResponseDto>(process);
    return Results.Created($"/charts/{chartId}/process/{process.Id}", processResponse);
});
    

app.Run();
