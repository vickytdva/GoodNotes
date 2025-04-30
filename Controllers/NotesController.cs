using Microsoft.AspNetCore.Mvc;
using GoodNotes.API.Data;
using GoodNotes.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GoodNotes.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _context;

    public NotesController(NotesDbContext context)
    {
        _context = context;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetNotes(string username)
    {
        var notes = await _context.Notes.Where(n => n.Username == username).ToListAsync();
        return Ok(notes);
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note note)
    {
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return Ok(note);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null) return NotFound();

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        return Ok();
    }
}