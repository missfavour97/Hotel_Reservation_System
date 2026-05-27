namespace backend.Models
{
    public class Room
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int Capacity { get; set; }

        public string BedType { get; set; } = string.Empty;

        public string Size { get; set; } = string.Empty;

        public string Amenities { get; set; } = string.Empty;

        public bool IsFeatured { get; set; }
    }
}
