using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignupRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Full name, email, and password are required.");
            }

            var email = request.Email.Trim().ToLowerInvariant();
            var emailExists = await _context.Users.AnyAsync(user => user.Email == email);

            if (emailExists)
            {
                return Conflict("An account with this email already exists.");
            }

            var user = new User
            {
                FullName = request.FullName.Trim(),
                Email = email,
                PasswordHash = PasswordHasher.Hash(request.Password),
                Role = "Guest",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(UserResponse.FromUser(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var email = request.Email.Trim().ToLowerInvariant();
            var user = await _context.Users.FirstOrDefaultAsync(existing => existing.Email == email);

            if (user is null || !PasswordHasher.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(UserResponse.FromUser(user));
        }
    }

    public record SignupRequest(string FullName, string Email, string Password);
    public record LoginRequest(string Email, string Password);

    public record UserResponse(int Id, string FullName, string Email, string Role, DateTime CreatedAt)
    {
        public static UserResponse FromUser(User user)
        {
            return new UserResponse(user.Id, user.FullName, user.Email, user.Role, user.CreatedAt);
        }
    }
}
