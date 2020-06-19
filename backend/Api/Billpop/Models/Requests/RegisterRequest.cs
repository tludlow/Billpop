namespace Api.Models.Requests
{
    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ExternalId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
