namespace TuyenDungAPI.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; } = string.Empty;
        public required string FirstName { get; set; } = string.Empty;

    }
}
