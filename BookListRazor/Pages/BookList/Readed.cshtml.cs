using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookListRazor.Models;
using Microsoft.EntityFrameworkCore;
using BookListRazor.Extensions;

namespace BookListRazor.Pages.BookList
{
    public class ReadedModel : PageModel
    {
        public string AntiforgeryToken => HttpContext.GetAntiforgeryTokenForJs();

        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
