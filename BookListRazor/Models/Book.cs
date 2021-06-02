using System;
using System.ComponentModel.DataAnnotations;

namespace BookListRazor.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required, DataType(DataType.Text)]
        [RegularExpression(@"[\S\d\s]{1,101}$", ErrorMessage = "No more 100 characters.")]
        public string Name { get; set; }

        [Required, DataType(DataType.Text)]
        [RegularExpression(@"[\S\d\s]{1,51}$", ErrorMessage = "No more 50 characters.")]
        public string Author { get; set; }

        [Required, DataType(DataType.Text)]
        public string Status { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Start reading")]
        public DateTime? StartRead { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "End reading")]
        public DateTime? EndRead { get; set; }
    }
}
