namespace backend.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public int Guests { get; set; }

        public int RoomId { get; set; }

        public Room? Room { get; set; }

        public int? UserId { get; set; }

        public User? User { get; set; }

        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
