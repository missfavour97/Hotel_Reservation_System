using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComplaintRequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await RequestEntities()
                .OrderByDescending(request => request.CreatedAt)
                .ToListAsync();

            return Ok(requests.Select(ToResponse));
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRequests(int userId)
        {
            var requests = await RequestEntities()
                .Where(request => request.UserId == userId)
                .OrderByDescending(request => request.CreatedAt)
                .ToListAsync();

            return Ok(requests.Select(ToResponse));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest(ComplaintRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Subject) ||
                string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Name, email, subject, and message are required.");
            }

            request.Status = "Open";
            request.CreatedAt = DateTime.UtcNow;
            request.User = null;

            _context.ComplaintRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(await FindRequestResponse(request.Id));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, StatusUpdateRequest request)
        {
            var complaintRequest = await _context.ComplaintRequests.FindAsync(id);

            if (complaintRequest is null)
            {
                return NotFound();
            }

            complaintRequest.Status = string.IsNullOrWhiteSpace(request.Status)
                ? complaintRequest.Status
                : request.Status;

            await _context.SaveChangesAsync();

            return Ok(await FindRequestResponse(id));
        }

        private IQueryable<ComplaintRequest> RequestEntities()
        {
            return _context.ComplaintRequests
                .Include(request => request.User);
        }

        private static RequestResponse ToResponse(ComplaintRequest request)
        {
            return new RequestResponse(
                request.Id,
                request.FullName,
                request.Email,
                request.Category,
                request.Subject,
                request.Message,
                request.Status,
                request.UserId,
                request.User == null ? null : request.User.FullName,
                request.CreatedAt
            );
        }

        private async Task<RequestResponse?> FindRequestResponse(int id)
        {
            var request = await RequestEntities().FirstOrDefaultAsync(request => request.Id == id);
            return request is null ? null : ToResponse(request);
        }
    }

    public record RequestResponse(
        int Id,
        string FullName,
        string Email,
        string Category,
        string Subject,
        string Message,
        string Status,
        int? UserId,
        string? UserFullName,
        DateTime CreatedAt
    );
}
