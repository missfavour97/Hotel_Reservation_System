using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public RoomsController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _context.Rooms
                .ToListAsync();

            return Ok(rooms.OrderBy(room => room.Price));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            return room is null ? NotFound() : Ok(room);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom(Room room)
        {
            if (string.IsNullOrWhiteSpace(room.Title) || room.Price <= 0)
            {
                return BadRequest("A room title and positive price are required.");
            }

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadRoomImage(IFormFile image)
        {
            if (image is null || image.Length == 0)
            {
                return BadRequest("Please select an image to upload.");
            }

            if (!image.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Only image files are allowed.");
            }

            if (image.Length > 5 * 1024 * 1024)
            {
                return BadRequest("Image size must be 5 MB or smaller.");
            }

            var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };

            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Allowed image types are JPG, PNG, and WebP.");
            }

            var webRootPath = _environment.WebRootPath
                ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var uploadsDirectory = Path.Combine(webRootPath, "uploads");
            Directory.CreateDirectory(uploadsDirectory);

            var fileName = $"{Guid.NewGuid():N}{extension}";
            var filePath = Path.Combine(uploadsDirectory, fileName);

            await using (var stream = System.IO.File.Create(filePath))
            {
                await image.CopyToAsync(stream);
            }

            return Ok(new { imageUrl = $"/uploads/{fileName}" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, Room updatedRoom)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room is null)
            {
                return NotFound();
            }

            room.Title = updatedRoom.Title;
            room.Description = updatedRoom.Description;
            room.Price = updatedRoom.Price;
            room.ImageUrl = updatedRoom.ImageUrl;
            room.Capacity = updatedRoom.Capacity;
            room.BedType = updatedRoom.BedType;
            room.Size = updatedRoom.Size;
            room.Amenities = updatedRoom.Amenities;
            room.IsFeatured = updatedRoom.IsFeatured;

            await _context.SaveChangesAsync();

            return Ok(room);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room is null)
            {
                return NotFound();
            }

            var hasBookings = await _context.Bookings.AnyAsync(booking => booking.RoomId == id);
            if (hasBookings)
            {
                return BadRequest("This room has bookings and cannot be deleted.");
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
