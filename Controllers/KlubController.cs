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

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            if (Klub != null)
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
            Club.Broj_Igraca = Club.Igraci.Count;
            Club.Igraci=new List<Igrac>(10);

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
                var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

                if (Klub != null)
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

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            return Ok(Klub);
        }

        [Route("Dodaj igraca u klub/{Naziv_klub}/{FideId}")]
        [HttpPut]
        public async Task<ActionResult> Dodaj_igraca_u_klub(string Naziv_klub, int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (Naziv_klub == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv_klub.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Fide == FideId).FirstOrDefault();
                var pKlub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv_klub) == 0).FirstOrDefault();

                if(pKlub!=null)
                {
                    if(Igrac!=null)
                    {
                        pKlub.Igraci.Remove(Igrac);   // Ovde javlja gresku!!!
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Klub {Naziv_klub} ne postoji u bazi!");
                
                Context.Klubovi.Update(pKlub);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o klubu, izbrisan je igrac {Igrac.Ime} {Igrac.Prezime} iz kluba {Naziv_klub}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Izbrisi igraca iz kluba/{Naziv_klub}/{FideId}")]
        [HttpPut]
        public async Task<ActionResult> Izbrisi_igraca(string Naziv_klub, int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (Naziv_klub == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv_klub.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Fide == FideId).FirstOrDefault();
                var pKlub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv_klub) == 0).FirstOrDefault();

                if(pKlub!=null)
                {
                    if(Igrac!=null)
                    {
                        Igrac.Klub=pKlub;
                        pKlub.Igraci.Add(Igrac);    // Ovde javlja gresku!!!
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Klub {Naziv_klub} ne postoji u bazi!");
                
                Context.Klubovi.Update(pKlub);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o klubu, dodat je igrac {Igrac.Ime} {Igrac.Prezime} u klub {Naziv_klub}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}