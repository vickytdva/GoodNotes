using Microsoft.EntityFrameworkCore;
using GoodNotes.API.Models;

namespace GoodNotes.API.Data;

public class NotesDbContext : DbContext
{
    public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }

    public DbSet<Note> Notes => Set<Note>();
}