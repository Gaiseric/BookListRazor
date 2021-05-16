using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BookListRazor.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$", ErrorMessage = "Only letters allowed, no more 40 characters.")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,20}$", ErrorMessage = "Only letters allowed, no more 20 characters.")]
        public string Author { get; set; }

        [Required, DataType(DataType.Date)]
        [Display(Name = "Start reading")]
        public DateTime StartRead { get; set; } = new DateTime(2020, 1, 1);

        [Required, DataType(DataType.Date)]
        [Display(Name = "End reading")]
        public DateTime EndRead { get; set; } = new DateTime(2020, 1, 1);
    }
}
