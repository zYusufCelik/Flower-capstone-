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

//chart kaydetme
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

// Chartı silme api
app.MapDelete("/deleteChart/{id:int}", async (int id, ApplicationDbContext dbContext, IMapper mapper) =>
{
    var chart = await dbContext.Charts
        .Include(c => c.Processes) 
        .FirstOrDefaultAsync(c => c.Id == id);

    if (chart is null)
        return Results.NotFound($"Chart with ID {id} not found.");

    // DTO'ya dönüştürme
    var chartDto = mapper.Map<ChartResponseDto>(chart);

    dbContext.Charts.Remove(chart);
    await dbContext.SaveChangesAsync();

    return Results.Ok(chartDto); 
});


    

app.Run();
