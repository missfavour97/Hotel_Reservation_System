using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

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
        public IActionResult CreateBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return Ok(booking);
        }

        [HttpGet]
        public IActionResult GetBookings()
        {
            var bookings = _context.Bookings.ToList();

            return Ok(bookings);
        }
    }
}