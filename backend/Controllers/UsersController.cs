using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .OrderByDescending(user => user.CreatedAt)
                .Select(user => new UserSummary(
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.Role,
                    user.CreatedAt
                ))
                .ToListAsync();

            return Ok(users);
        }
    }

    public record UserSummary(int Id, string FullName, string Email, string Role, DateTime CreatedAt);
}
