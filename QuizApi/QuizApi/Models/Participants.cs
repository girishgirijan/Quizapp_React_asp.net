using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApi.Models
{
    public class Participants
    {
        [Key]
        public int ParticipantId { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string ParticipantEmail { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string ParticipantName { get; set; }
        public int Score { get; set; }
        public int TimeTaken {  get; set; } 
    }

    public class ParticipantResult
    {
        public int ParticipantId { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
}
