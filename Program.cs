using GoodNotes.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add SQLite database
builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseSqlite("Data Source=GoodNotes.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();
app.Run();