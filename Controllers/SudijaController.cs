using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using System.Collections.Generic;


namespace Web_Projekat_Sah.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudijaController : ControllerBase
    {
        public Context Context { get; set; }

        public SudijaController(Context context)
        {
            Context = context;
        }

        //---------------------------------------------------------------------------------------------------------

        //              POST METODE

        [Route("Unos sudije/{Ime}/{Prezime}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_sudija(string Ime, string Prezime, Kategorija category)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti ime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            Sudija Arbitar = new Sudija();

            Arbitar.Ime = Ime;
            Arbitar.Prezime = Prezime;
            Arbitar.Kategorija = category;
            Arbitar.Sudjeni_turniri=new List<Turnir>();

            try
            {
                Context.Sudije.Add(Arbitar);
                await Context.SaveChangesAsync();
                return Ok($"Sudija {Ime} {Prezime} je dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //---------------------------------------------------------------------------------------------------------

        //              GET METODE

        [Route("Pregledaj sudiju/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult Vrati_sudiju(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            var Sudija = Context.Sudije.Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();

            return Ok(Sudija);
        }

        [Route("Pogledaj sudjene turnire/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult Sudjeni_turniri(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            var Sudija = Context.Sudije.Include(p=>p.Sudjeni_turniri).Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();

            return Ok(Sudija.Sudjeni_turniri.ToList());
        }

        //---------------------------------------------------------------------------------------------------------

        //              DELETE METODE

        [Route("Brisanje sudije/{FideId}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_sudiju(string Ime, string Prezime)
        {
            if (Ime == "") return BadRequest("Morate uneti ime sudije");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            try
            {
                var Sudija = Context.Sudije.Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0).FirstOrDefault();
                if (Sudija != null)
                {
                    string Name = Sudija.Ime;
                    string SurName = Sudija.Prezime;

                    Context.Sudije.Remove(Sudija);
                    await Context.SaveChangesAsync();
                    return Ok($"Sudija {Name} {SurName} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav sudija ne postoji!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //---------------------------------------------------------------------------------------------------------

        //              PUT METODE

       
    }
}
