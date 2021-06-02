using System.Threading.Tasks;
using BookListRazor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BookListRazor.Pages.BookList
{
    public class UpsertModel : PageModel
    {
        readonly ApplicationDbContext _db;
        static string copyBook;

        [BindProperty]
        public Book Book { get; set; }

        public UpsertModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> OnGet(int? id)
        {
            Book = new Book();
            if (id == null)
            {
                return Page();
            }
            Book = await _db.Book.FindAsync(id);
            if (Book == null)
            {
                return NotFound();
            }
            copyBook = Book.Name;
            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            switch (Book.Status)
            {
                case "Reading":
                    if (Book.StartRead == null) 
                        ModelState.AddModelError("Book.StartRead", "Start reading date required for status. \"Reading\"");
                    break;
                case "Readed":
                    if (Book.StartRead == null)
                        ModelState.AddModelError("Book.StartRead", "Start reading date required for status \"Readed\".");
                    else if (Book.EndRead == null)
                        ModelState.AddModelError("Book.EndRead", "End reading date required for status \"Readed\".");
                    break;
                default:
                    break;
            }
            if ((Book.Id == 0) || (copyBook != Book.Name))
            {
                if (await _db.Book.AnyAsync(b => b.Name == Book.Name))
                {
                    ModelState.AddModelError("Book.Name", "Book with such name already exists.");
                }
            }
            if (ModelState.IsValid)
            {
                if (Book.Id == 0)
                {
                    _db.Book.Add(Book);
                }
                else
                {
                    _db.Book.Update(Book);
                }
                await _db.SaveChangesAsync();
                return RedirectToPage("/BookList/List");
            }
            else
            {
                return Page();
            }
        }
    }
}
