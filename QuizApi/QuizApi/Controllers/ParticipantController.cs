using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApi.Models;

namespace QuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participants>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participants>> GetParticipants(int id)
        {
            var participants = await _context.Participants.FindAsync(id);

            if (participants == null)
            {
                return NotFound();
            }

            return participants;
        }

        // PUT: api/Participant/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipants(int id, ParticipantResult _participantResult)
        {
            if (id != _participantResult.ParticipantId)
            {
                return BadRequest();
            }

            var participants =  _context.Participants.Find(id);
            participants.Score = _participantResult.Score;
            participants.TimeTaken = _participantResult.TimeTaken;

            _context.Entry(participants).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participant
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participants>> PostParticipants(Participants participants)
        {
            var temp = _context.Participants.Where(x => x.ParticipantName == participants.ParticipantName && x.ParticipantEmail == participants.ParticipantEmail).FirstOrDefault();
            if(temp == null)
            {
                _context.Participants.Add(participants);
                await _context.SaveChangesAsync();
            }
            else 
                participants = temp;

            return Ok(participants);

            //return CreatedAtAction("GetParticipants", new { id = participants.ParticipantId }, participants);
        }

        // DELETE: api/Participant/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipants(int id)
        {
            var participants = await _context.Participants.FindAsync(id);
            if (participants == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participants);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantsExists(int id)
        {
            return _context.Participants.Any(e => e.ParticipantId == id);
        }
    }
}
