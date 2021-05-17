using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookListRazor.Models;

namespace BookListRazor.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db;

        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string type)
        {
            List<Book> responce = new List<Book>();
            switch (type)
            {
                case "readed":
                    foreach (Book b in await _db.Book.ToListAsync())
                    {
                        if (b.Status == "Readed") { responce.Add(b); }
                    }
                    return Json(new { data = responce });
                case "reading":
                    foreach (Book b in await _db.Book.ToListAsync())
                    {
                        if (b.Status == "Reading") { responce.Add(b); }
                    }
                    return Json(new { data = responce });
                case "planned":
                    foreach (Book b in await _db.Book.ToListAsync())
                    {
                        if (b.Status == "Planned") { responce.Add(b); }
                    }
                    return Json(new { data = responce });
                default:
                    return NotFound();
            }
        }

        [AutoValidateAntiforgeryToken]
        [HttpDelete]
        public async  Task<IActionResult> Delete(int id)
        {
            var book = await _db.Book.FindAsync(id);
            if(book == null)
            {
                return Json(new { success = false, message = "Error while Deleting" });
            }
            _db.Book.Remove(book);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Delete successsful" });
        }
    }
}
