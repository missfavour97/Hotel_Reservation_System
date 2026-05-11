using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=hotel.db"));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    if (!db.Rooms.Any())
    {
        db.Rooms.AddRange(
            new backend.Models.Room
            {
                Title = "Standard Room",
                Description = "Comfortable and affordable room.",
                Price = 250,
                ImageUrl = "standard1.jpeg"
            },

            new backend.Models.Room
            {
                Title = "Double Bed Room",
                Description = "Comfortable and affordable room.",
                Price = 300,
                ImageUrl = "double_bed1.jpeg"
            },

            new backend.Models.Room
            {
                Title = "Deluxe Room",
                Description = "Spacious deluxe room with premium comfort.",
                Price = 500,
                ImageUrl = "deluxe2.jpg"
            },

            new backend.Models.Room
            {
                Title = "Executive Room",
                Description = "Luxury room designed for VIP guests.",
                Price = 700,
                ImageUrl = "executive1.jpeg"
            },

            new backend.Models.Room
            {
                Title = "Presidential Suite",
                Description = "Exclusive luxury suite with premium amenities.",
                Price = 1200,
                ImageUrl = "presidential1.jpeg"
            }
        );

        db.SaveChanges();
    }
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
