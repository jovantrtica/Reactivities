

// data retrived when user logs in

using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] // osobine podataka koje zelimo da ubacimo u bazu
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]        
        public string Password { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}