using Microsoft.EntityFrameworkCore; 
namespace QuizApi.Models
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        {

        }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Participants> Participants { get; set; }

    }
}
