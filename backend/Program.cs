using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;

// The app does not need live appsettings reload, and disabling it avoids
// file watcher stalls in sandboxed school/demo environments.
Environment.SetEnvironmentVariable("DOTNET_hostBuilder__reloadConfigOnChange", "false");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=hotel.db"));

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

app.UseCors("AllowReact");
app.UseStaticFiles();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
    SeedDatabase(db);
}

app.Run();

static void SeedDatabase(ApplicationDbContext db)
{
    var seedRooms = new[]
    {
        new Room
        {
            Title = "Standard Room",
            Description = "Comfortable and affordable room for quick city stays.",
            Price = 250,
            ImageUrl = "standard1.jpeg",
            Capacity = 2,
            BedType = "Queen Bed",
            Size = "28 m2",
            Amenities = "Fast Wi-Fi,Smart TV,Work desk,Air conditioning,Private bathroom",
            IsFeatured = false
        },

        new Room
        {
            Title = "Double Bed Room",
            Description = "A relaxed room with extra sleeping space for friends or family.",
            Price = 300,
            ImageUrl = "double_bed1.jpeg",
            Capacity = 4,
            BedType = "Two Double Beds",
            Size = "34 m2",
            Amenities = "Fast Wi-Fi,Smart TV,Mini fridge,Air conditioning,Private bathroom",
            IsFeatured = false
        },

        new Room
        {
            Title = "Deluxe Room",
            Description = "Spacious deluxe room with refined finishes and premium comfort.",
            Price = 500,
            ImageUrl = "deluxe2.jpg",
            Capacity = 2,
            BedType = "King Bed",
            Size = "42 m2",
            Amenities = "Fast Wi-Fi,City view,Coffee station,Premium toiletries,Room service",
            IsFeatured = true
        },

        new Room
        {
            Title = "Executive Room",
            Description = "Luxury room designed for business travelers and VIP guests.",
            Price = 700,
            ImageUrl = "executive1.jpeg",
            Capacity = 2,
            BedType = "King Bed",
            Size = "50 m2",
            Amenities = "Executive desk,Lounge access,Fast Wi-Fi,Espresso machine,Room service",
            IsFeatured = true
        },

        new Room
        {
            Title = "Presidential Suite",
            Description = "Exclusive suite with a living area, elevated service, and premium amenities.",
            Price = 1200,
            ImageUrl = "presidential1.jpeg",
            Capacity = 4,
            BedType = "King Bed and Lounge",
            Size = "85 m2",
            Amenities = "Private lounge,Panoramic view,Butler service,Premium minibar,Spa bathroom",
            IsFeatured = true
        }
    };

    foreach (var seedRoom in seedRooms)
    {
        var existingRoom = db.Rooms.FirstOrDefault(room => room.Title == seedRoom.Title);

        if (existingRoom is null)
        {
            db.Rooms.Add(seedRoom);
            continue;
        }

        if (existingRoom.Capacity == 0)
        {
            existingRoom.Capacity = seedRoom.Capacity;
        }

        if (string.IsNullOrWhiteSpace(existingRoom.BedType))
        {
            existingRoom.BedType = seedRoom.BedType;
        }

        if (string.IsNullOrWhiteSpace(existingRoom.Size))
        {
            existingRoom.Size = seedRoom.Size;
        }

        if (string.IsNullOrWhiteSpace(existingRoom.Amenities))
        {
            existingRoom.Amenities = seedRoom.Amenities;
        }

        existingRoom.IsFeatured = existingRoom.IsFeatured || seedRoom.IsFeatured;
    }

    const string adminEmail = "admin@luxestay.edu";
    if (!db.Users.Any(user => user.Email == adminEmail))
    {
        db.Users.Add(new User
        {
            FullName = "LuxeStay Admin",
            Email = adminEmail,
            PasswordHash = PasswordHasher.Hash("admin123"),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        });
    }

    db.SaveChanges();
}
