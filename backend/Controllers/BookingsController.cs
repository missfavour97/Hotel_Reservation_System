using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(Booking booking)
        {
            if (booking.CheckOutDate <= booking.CheckInDate)
            {
                return BadRequest("Check-out date must be after check-in date.");
            }

            if (booking.Guests <= 0)
            {
                return BadRequest("At least one guest is required.");
            }

            var roomExists = await _context.Rooms.AnyAsync(room => room.Id == booking.RoomId);
            if (!roomExists)
            {
                return BadRequest("Selected room does not exist.");
            }

            booking.Status = string.IsNullOrWhiteSpace(booking.Status)
                ? "Pending"
                : booking.Status;
            booking.CreatedAt = DateTime.UtcNow;
            booking.Room = null;
            booking.User = null;

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(await FindBookingResponse(booking.Id));
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await BookingEntities()
                .OrderByDescending(booking => booking.CreatedAt)
                .ToListAsync();

            return Ok(bookings.Select(ToResponse));
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            var bookings = await BookingEntities()
                .Where(booking => booking.UserId == userId)
                .OrderByDescending(booking => booking.CreatedAt)
                .ToListAsync();

            return Ok(bookings.Select(ToResponse));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, StatusUpdateRequest request)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking is null)
            {
                return NotFound();
            }

            booking.Status = string.IsNullOrWhiteSpace(request.Status)
                ? booking.Status
                : request.Status;

            await _context.SaveChangesAsync();

            return Ok(await FindBookingResponse(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking is null)
            {
                return NotFound();
            }

            booking.Status = "Cancelled";
            await _context.SaveChangesAsync();

            return Ok(await FindBookingResponse(id));
        }

        private IQueryable<Booking> BookingEntities()
        {
            return _context.Bookings
                .Include(booking => booking.Room)
                .Include(booking => booking.User);
        }

        private static BookingResponse ToResponse(Booking booking)
        {
            return new BookingResponse(
                booking.Id,
                booking.FullName,
                booking.Email,
                booking.CheckInDate,
                booking.CheckOutDate,
                booking.Guests,
                booking.RoomId,
                booking.Room == null ? "Unknown room" : booking.Room.Title,
                booking.UserId,
                booking.User == null ? null : booking.User.FullName,
                booking.Status,
                booking.CreatedAt
            );
        }

        private async Task<BookingResponse?> FindBookingResponse(int id)
        {
            var booking = await BookingEntities().FirstOrDefaultAsync(booking => booking.Id == id);
            return booking is null ? null : ToResponse(booking);
        }
    }

    public record StatusUpdateRequest(string Status);

    public record BookingResponse(
        int Id,
        string FullName,
        string Email,
        DateTime CheckInDate,
        DateTime CheckOutDate,
        int Guests,
        int RoomId,
        string RoomTitle,
        int? UserId,
        string? UserFullName,
        string Status,
        DateTime CreatedAt
    );
}
