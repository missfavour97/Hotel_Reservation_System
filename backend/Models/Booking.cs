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
    }
}