using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazor.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BookListRazor.Pages.BookList
{
    public class PlannedModel : PageModel
    {
        public string AntiforgeryToken => HttpContext.GetAntiforgeryTokenForJs();

        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
