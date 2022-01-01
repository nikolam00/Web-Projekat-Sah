using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;


namespace Web_Projekat_Sah.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IgracController : ControllerBase
    {
        public Context Context { get; set; }

        public IgracController(Context context)
        {
            Context = context;
        }
        ///{Datum_rodjenja}
        [Route("Unos igraca/{FideId}/{Ime}/{Prezime}/{Naziv_kluba}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_igraca(int FideId, string Ime, string Prezime, DateTime Datum_rodjenja, int Rating, Titula Title, string Naziv_kluba)
        {
            if (Ime == "") return BadRequest("Morate uneti ime igraca");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti ime igraca");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresan FideId!");

            if (Datum_rodjenja.Year < 1940) return BadRequest("Pogrsan datum rodjenja!");

            if (Rating < 1200 || Rating > 3000) return BadRequest("Pogresna vrednost za rejting!");

            if (Naziv_kluba == "") return BadRequest("Morate uneti ime Kluba");

            Igrac player = new Igrac();

            player.Fide = FideId;
            player.Ime = Ime;
            player.Prezime = Prezime;
            player.Datum_rodjenja = Datum_rodjenja;
            player.Rejting = Rating;
            player.Titula = Title;

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv_kluba) == 0).FirstOrDefault();

            if (Klub == null)
            {
                return BadRequest($"Uneti klub {Naziv_kluba} ne postoji!");
            }

            player.Klub = Klub;

            try
            {
                Context.Igraci.Add(player);
                await Context.SaveChangesAsync();
                return Ok($"Igrac {Ime} {Prezime} je dodat u bazu!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }


        [Route("Brisanje igraca/{FideId}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_igraca(int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Fide == FideId).FirstOrDefault();
                if (Igrac != null)
                {
                    string Name = Igrac.Ime;
                    string SurName = Igrac.Prezime;

                    Context.Igraci.Remove(Igrac);
                    await Context.SaveChangesAsync();
                    return Ok($"Igrac sa FideId brojem {FideId}, {Name} {SurName} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav igrac ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Pregledaj igraca/{FideId}")]
        [HttpGet]
        public ActionResult Vrati_igraca(int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");

            var Igrac = Context.Igraci.Where(p => p.Fide == FideId).Include(p => p.Klub).FirstOrDefault();

            return Ok(Igrac);
        }
    }
}
