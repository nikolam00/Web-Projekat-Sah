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
    public class TurnirController : ControllerBase
    {
        public Context Context { get; set; }

        public TurnirController(Context context)
        {
            Context = context;
        }

        [Route("Unos turnira/{Naziv}/{Mesto}/{Broj_Telefona}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_turnir(string Naziv, string Klub_organizator,DateTime Pocetak, string Mesto, int Nagrada)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Klub_organizator) == 0).FirstOrDefault();

            if (Klub == null)
            {
                return BadRequest("Klub sa ovim imenom ne postoji!");
            }

            // Da bi mogli da izvrismo kasnije brisanje ime kluba mora da bude jedinstveno

            if (Mesto == "") return BadRequest("Morate uneti mesto");
            if (Mesto.Length > 50) return BadRequest("Pogresna duzina mesto!");

            Turnir Tournament = new Turnir();

            Tournament.Naziv = Naziv;
            Tournament.Klub_organizator=Klub;
            Tournament.Mesto = Mesto;
            Tournament.Datum_pocetka=Pocetak;
            Tournament.Nagrada=Nagrada;

            Tournament.Pobednik=null;
            
            try
            {
                Context.Turniri.Add(Tournament);
                await Context.SaveChangesAsync();
                return Ok($"Turnir {Naziv} je uspesno dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Pregledaj turnir /{Naziv}")]
        [HttpGet]
        public ActionResult Vrati_turnir(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira!");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir = Context.Turniri.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            return Ok(Turnir);
        }
    }
}