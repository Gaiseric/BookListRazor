using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookListRazor.Extensions;

namespace BookListRazor.Pages.BookList
{
    public class ListModel : PageModel
    {
        public string AntiforgeryToken => HttpContext.GetAntiforgeryTokenForJs();

        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
