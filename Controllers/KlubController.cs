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
    public class KlubController : ControllerBase
    {
        public Context Context { get; set; }

        public KlubController(Context context)
        {
            Context = context;
        }
    
        [Route("Unos kluba/{Naziv}/{Mesto}/{Broj_Telefona}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_klub(string Naziv, string Mesto, string Broj_Telefona)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klub = Context.Klubovi.Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

            if(Klub!=null)
            {
                return BadRequest("Klub sa ovim imenom je vec osnovan!");
            }

            // Da bi mogli da izvrismo kasnije brisanje ime kluba mora da bude jedinstveno

            if (Mesto == "") return BadRequest("Morate uneti mesto");
            if (Mesto.Length > 20) return BadRequest("Pogresna duzina mesto!");

            if (Broj_Telefona == "") return BadRequest("Morate uneti broj telefona!");
            if (Broj_Telefona.Length > 20) return BadRequest("Pogresna duzina broj telefona!");

            Klub Club = new Klub();

            Club.Naziv = Naziv;
            Club.Mesto = Mesto;
            Club.Broj_Telefona = Broj_Telefona;
            Club.Broj_Igraca = 0;

            try
            {
                Context.Klubovi.Add(Club);
                await Context.SaveChangesAsync();
                return Ok($"Klub {Naziv} je uspesno dodat u bazu!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }


        [Route("Brisanje kluba/{Naziv}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_klub(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
               var Klub = Context.Klubovi.Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

                if(Klub!=null)
                {
                    Context.Klubovi.Remove(Klub);
                    await Context.SaveChangesAsync();
                    return Ok($"Klub {Naziv} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav klub ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Pregledaj klub/{Naziv}")]
        [HttpGet]
        public ActionResult Vrati_igraca(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klub = Context.Klubovi.Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

            return Ok(Klub);
        }
    }
}
