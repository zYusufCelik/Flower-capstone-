using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);

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

app.MapPost("/newChart", async (Chart chart, ApplicationDbContext dbContext) => {
    dbContext.Charts.Add(chart);
    await dbContext.SaveChangesAsync();

    return Results.Created($"/newChart/{chart.Id}", chart);
});

app.MapGet("/charts", async (ApplicationDbContext dbContext) =>
    Results.Ok(await dbContext.Charts.ToListAsync()));

app.Run();
