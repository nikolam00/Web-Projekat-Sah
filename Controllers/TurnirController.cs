using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
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

        //---------------------------------------------------------------------------------------------------------

        //              POST METODE

        [Route("Unos_turnira/{Naziv}/{Klub_organizator}/{Pocetak}/{Mesto}/{Broj_Telefona}/{Nagrada}/{Sudija_ID}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_turnir(string Naziv, string Klub_organizator, int Sudija_ID, DateTime Pocetak, string Mesto, int Nagrada)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir = Context.Turniri.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            if (Turnir != null)
            {
                return BadRequest("Turnir sa ovim imenom vec postoji u bazi!");
            }

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Klub_organizator) == 0).FirstOrDefault();

            if (Klub == null)
            {
                return BadRequest("Klub sa ovim imenom ne postoji!");
            }

            var Arbitar=Context.Sudije.Where(p=>p.SudijaID==Sudija_ID).FirstOrDefault();

            if (Arbitar == null)
            {
                return BadRequest("Sudija sa ovim Id ne postoji!");
            }

            // Ne moze ovde da prodje javlja gresku da je null za arbitra

            //Arbitar.Sudjeni_turniri.Add(Turnir);
            //Context.Sudije.Update(Arbitar);
            
            // Da bi mogli da izvrismo kasnije brisanje ime turnira mora da bude jedinstveno

            if (Mesto == "") return BadRequest("Morate uneti mesto");
            if (Mesto.Length > 50) return BadRequest("Pogresna duzina mesto!");

            Turnir Tournament = new Turnir();

            Tournament.Naziv = Naziv;
            Tournament.Klub_organizator = Klub;
            Tournament.Sudija=Arbitar;
            Tournament.Mesto = Mesto;
            Tournament.Datum_pocetka = Pocetak;
            Tournament.Nagrada = Nagrada;
            Tournament.Mecevi = new List<Mec>();
            Tournament.Prijavljeni_igraci = new List<Igrac>();
            Tournament.Pobednik = null;

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

        //---------------------------------------------------------------------------------------------------------

        //              GET METODE

        [Route("Pregledaj_turnir/{Naziv}")]
        [HttpGet]
        public ActionResult Vrati_turnir(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira!");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir = Context.Turniri
            .Include(p=>p.Klub_organizator)
            .Include(p=>p.Sudija)
            .Include(p=>p.Pobednik)
            .Include(p=>p.Mecevi)
            .Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            return Ok(Turnir);
        }

        [Route("Prijavljeni_igraci/{Naziv}")]
        [HttpGet]
        public ActionResult Prijavljeni_igraci(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira!");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir=Context.Turniri
            .Include(p=>p.Prijavljeni_igraci)
            .ThenInclude(p=>p.Klub)
            .Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

            return Ok(Turnir.Prijavljeni_igraci.ToList());
        }

        [Route("Pogledaj_kolo/{Naziv}/{BrKola}")]
        [HttpGet]
        public ActionResult Vrati_kolo(string Naziv,int BrKola)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira!");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Kolo_mecevi=Context.Mecevi
            .Include(p=>p.Beli)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Crni)
            .ThenInclude(p=>p.Klub)
            .Include(p=>p.Turnir)
            .ThenInclude(p=>p.Sudija)
            .Where(p=>p.Kolo==BrKola && p.Turnir.Naziv.CompareTo(Naziv)==0);

            return Ok(Kolo_mecevi);
        }

        [Route("Svi_turniri")]
        [HttpGet]
        public ActionResult Svi_turniri()
        {
            var turnirs = Context.Turniri
                        .Include(p => p.Klub_organizator)
                        .Include(p=>p.Prijavljeni_igraci)
                        .Include(p=>p.Ostali_igraci)
                        .Include(p=>p.Sudija)
                        .Include(p=>p.Pobednik);

            return Ok(turnirs.ToList());
        }

        [Route("Svi_mecevi")]
        [HttpGet]
        public ActionResult Svi_mecevi()
        {
            var mecevi = Context.Mecevi
                        .Include(p => p.Beli)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Crni)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Turnir)
                        .ThenInclude(p=>p.Klub_organizator);

            return Ok(mecevi.ToList());
        }

        [Route("Mecevi_igrac/{Fide}")]
        [HttpGet]
        public ActionResult Svi_mecevi_igrac(int Fide)
        {
            var mecevi = Context.Mecevi
                        .Include(p => p.Beli)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Crni)
                        .ThenInclude(p=>p.Klub)
                        .Include(p=>p.Turnir)
                        .ThenInclude(p=>p.Klub_organizator)
                        .Where(p=>p.Beli.Fide==Fide||p.Crni.Fide==Fide);

            return Ok(mecevi.ToList());
        }

        //---------------------------------------------------------------------------------------------------------

        //              DELETE METODE

        [Route("Brisanje_turnira/{Naziv}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_turnir(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir = Context.Turniri.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    Context.Turniri.Remove(Turnir);
                    await Context.SaveChangesAsync();
                    return Ok($"Klub {Naziv} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav turnir ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //---------------------------------------------------------------------------------------------------------

        //              PUT METODE

        [Route("Upisi_igraca/{Naziv}/{FideId}")]
        [HttpPut]
        public async Task<ActionResult> Upisi_igraca(string Naziv, int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Include(p => p.Klub).Where(p => p.Fide == FideId).FirstOrDefault();
                var Turnir = Context.Turniri.Include(p => p.Prijavljeni_igraci).Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();
                //                                          ---------------------------------
                if (Turnir != null)
                {
                    if (Igrac != null)
                    {
                        Turnir.Prijavljeni_igraci.Add(Igrac);   

                        Context.Turniri.Update(Turnir);
                        await Context.SaveChangesAsync();
                        return Ok($"Izmenjeni podaci o turniru, u listu prijavljenih igraca dodat je igrac {Igrac.Ime} {Igrac.Prezime}!");
                    }
                    else
                        return BadRequest("Igrac ne postoji u bazi!");
                }
                else
                    return BadRequest($"Turnir {Naziv} ne postoji u bazi!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Kreiraj_kolo/{Naziv}/{brKola}")]
        [HttpPut]
        public async Task<ActionResult> Kreiraj_kolo(string Naziv, int brKola)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir = Context.Turniri
                            .Include(p => p.Mecevi)
                            .Include(p => p.Prijavljeni_igraci)
                            .Include(p => p.Ostali_igraci)
                            .Include(p=>p.Mecevi)
                            .Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    if (brKola == 1)
                    {
                        Turnir.Ostali_igraci = Turnir.Prijavljeni_igraci;
                    }

                    // Proveri da li je bolja ideja da dodajes sve meceve u jednu listu, a da mecevi kola budu u drugoj listi meceva, i tada necu da imam Turnir u klasi Mec

                    Turnir.Mecevi.Clear();      // Svaki put kada kreiramo kolo, prethodni mecevi sa tog turnira se brisu

                    int BrUcesnika = Turnir.Ostali_igraci.Count;

                    int i = 0;

                    for (int j = 0; j < BrUcesnika / 2; j++)
                    {
                        Mec Par = new Mec();

                        Par.Kolo = brKola;
                        Par.Beli = Turnir.Ostali_igraci[i++];
                        Par.Crni = Turnir.Ostali_igraci[i++];

                        Turnir.Mecevi.Add(Par);
                        Context.Mecevi.Add(Par);
                    }
                }
                else
                    return BadRequest($"Turnir {Naziv} ne postoji u bazi!");

                Context.Turniri.Update(Turnir);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o turniru, dodati mecevi za Kolo {brKola}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Upisi_rezultate_kola/{Naziv}/{brKola}")]
        [HttpPut]
        public async Task<ActionResult> Rezultati_kolo(string Naziv, int brKola, [FromQuery] int[] rezultati)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir = Context.Turniri.Include(p => p.Mecevi).Include(p => p.Ostali_igraci).Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    int i = 0;

                    foreach (Mec M in Turnir.Mecevi)
                    {
                        M.Result = (Rezultat)rezultati[i];

                        if (M.Result == Rezultat.Pobeda_Beli)
                        {
                            var igrac = Context.Igraci.Where(p => p.Fide == M.Crni.Fide).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }
                        else
                        {
                            var igrac = Context.Igraci.Where(p => p.Fide == M.Beli.Fide).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }

                        Context.Mecevi.Update(M);
                    }
                }
                else
                    return BadRequest($"Turnir {Naziv} ne postoji u bazi!");

                Context.Turniri.Update(Turnir);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o turniru, dodati mecevi za Kolo {brKola}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Proglasi_pobednika/{Naziv}")]
        [HttpPut]        
        public async Task<ActionResult> Proglasi_pobednika(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir = Context.Turniri.Include(p => p.Ostali_igraci).Include(p=>p.Pobednik).Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

                if (Turnir != null)
                {
                    if (Turnir.Ostali_igraci.Count == 1)
                    {
                        Turnir.Pobednik = Turnir.Ostali_igraci[0];

                        var Igrac = Turnir.Ostali_igraci[0];
                        Igrac.Rejting = Igrac.Rejting + Turnir.Nagrada;

                        Context.Igraci.Update(Igrac);
                        await Context.SaveChangesAsync();
                        Context.Turniri.Update(Turnir);
                        await Context.SaveChangesAsync();

                        return Ok($"Izmenjeni podaci o turniru, pobednik turnira {Naziv} je {Igrac.Ime} {Igrac.Prezime}!");
                    }
                    else
                        return BadRequest("Nije vreme za proglasenje pobednika jos uvek, nije ostao samo jedan igrac!");
                }
                else
                    return BadRequest($"Turnir {Naziv} ne postoji u bazi!");



            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}