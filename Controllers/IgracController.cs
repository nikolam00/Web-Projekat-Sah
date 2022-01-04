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

            var club = Context.Klubovi.Where(p => p.Naziv.CompareTo(Naziv_kluba) == 0).FirstOrDefault();

            if (club == null)
            {
                return BadRequest($"Uneti klub {Naziv_kluba} ne postoji!");
            }

            player.Klub = club;

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

            var Igrac = Context.Igraci.Include(p=>p.Klub).Where(p => p.Fide == FideId).FirstOrDefault();

            return Ok(Igrac);
        }

        [Route("Promeni klub /{FideId}/{Naziv_klub}")]
        [HttpPut]
        public async Task<ActionResult> Dodaj_igraca_u_klub(string Naziv_klub, int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (Naziv_klub == "") return BadRequest("Morate uneti ime kluba");
            if (Naziv_klub.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Include(p=>p.Klub).Where(p => p.Fide == FideId).FirstOrDefault();
                var pKlub = Context.Klubovi.Include(p=>p.Igraci).Where(p => p.Naziv.CompareTo(Naziv_klub) == 0).FirstOrDefault();

                if(pKlub!=null)
                {
                    if(Igrac!=null)
                    {
                        Igrac.Klub=pKlub;
                        
                        // Deo za dodavanje igraca u klub samo ako on nije vec u tom klubu

                        int q=1;

                        foreach(var I in pKlub.Igraci)
                        {
                            if(I.Fide==Igrac.Fide) q=0;
                        }

                        if(q==1)
                        {
                            pKlub.Igraci.Add(Igrac);
                        }
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Klub {Naziv_klub} ne postoji u bazi!");
                
                Context.Igraci.Update(Igrac);
                Context.Klubovi.Update(pKlub);

                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o igracu {Igrac.Ime} {Igrac.Prezime}, presao je u klub {Naziv_klub}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Promeni rejting /{FideId}")]
        [HttpPut]
        public async Task<ActionResult> PromeniRating(int FideId, int PromenaRejtinga)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (PromenaRejtinga<-200 || PromenaRejtinga>200) return BadRequest("Pogresna vrednost za promenu rejtinga!");

             try
            {
                var Igrac = Context.Igraci.Where(p => p.Fide == FideId).FirstOrDefault();

                Igrac.Rejting=Igrac.Rejting+PromenaRejtinga;

                Context.Igraci.Update(Igrac);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o igracu {Igrac.Ime} {Igrac.Prezime}, novi rejting igraca je {Igrac.Rejting}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
