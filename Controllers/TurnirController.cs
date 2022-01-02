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

    //-----------------------------------------------------------------------------------------------------------------

        [Route("Unos turnira/{Naziv}/{Mesto}/{Broj_Telefona}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_turnir(string Naziv, string Klub_organizator,DateTime Pocetak, string Mesto, int Nagrada)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir=Context.Turniri.Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

            if(Turnir!=null)
            {
                return BadRequest("Turnir sa ovim imenom vec postoji u bazi!");
            }

            var Klub = Context.Klubovi.Where(p => p.Naziv.CompareTo(Klub_organizator) == 0).FirstOrDefault();

            if (Klub == null)
            {
                return BadRequest("Klub sa ovim imenom ne postoji!");
            }

            // Da bi mogli da izvrismo kasnije brisanje ime turnira mora da bude jedinstveno

            if (Mesto == "") return BadRequest("Morate uneti mesto");
            if (Mesto.Length > 50) return BadRequest("Pogresna duzina mesto!");

            Turnir Tournament = new Turnir();

            Tournament.Naziv = Naziv;
            Tournament.Klub_organizator=Klub;
            Tournament.Mesto = Mesto;
            Tournament.Datum_pocetka=Pocetak;
            Tournament.Nagrada=Nagrada;
            Tournament.Mecevi=new List<Mec>();
            Tournament.Prijavljeni_igraci=new List<Igrac>();
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

    //-----------------------------------------------------------------------------------------------------------------

        [Route("Pregledaj turnir /{Naziv}")]
        [HttpGet]
        public ActionResult Vrati_turnir(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira!");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            var Turnir = Context.Turniri.Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();

            return Ok(Turnir);
        }

    //-----------------------------------------------------------------------------------------------------------------

        [Route("Brisanje turnira/{Naziv}")]
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

    //-----------------------------------------------------------------------------------------------------------------

        [Route("Upisi_igraca/{Naziv}/{FideId}")]
        [HttpPut]
        public async Task<ActionResult> Upisi_igraca(string Naziv, int FideId)
        {
            if (FideId < 0 || FideId > 999999) return BadRequest("Pogresna vrednost za FideId!");
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Igrac = Context.Igraci.Include(p=>p.Klub).Where(p => p.Fide == FideId).FirstOrDefault();
                var Turnir = Context.Turniri.Include(p=>p.Prijavljeni_igraci).Where(p => p.Naziv.CompareTo(Naziv) == 0).FirstOrDefault();
//                                          ---------------------------------
                if(Turnir!=null)
                {
                    if(Igrac!=null)
                    {
                        Turnir.Prijavljeni_igraci.Add(Igrac);   // Ovde javlja gresku!!!

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
        
    //-----------------------------------------------------------------------------------------------------------------

        [Route("Kreiraj kolo/{Naziv}/{brKola}")]
        [HttpPut]
        public async Task<ActionResult> Kreiraj_kolo(string Naziv,int brKola)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir=Context.Turniri.Include(p=>p.Mecevi).Include(p=>p.Prijavljeni_igraci).Include(p=>p.Ostali_igraci).Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

                if(Turnir!=null)
                {
                    if(brKola==1)
                    {
                        Turnir.Ostali_igraci=Turnir.Prijavljeni_igraci;
                    }

                    Turnir.Mecevi.Clear();      // Svaki put kada kreiramo kolo, prethodni mecevi sa tog turnira se brisu

                    int BrUcesnika=Turnir.Ostali_igraci.Count;

                    int i=0;

                    for(int j=0;j<BrUcesnika/2;j++)
                    {
                        Mec Par=new Mec();

                        Par.Kolo=brKola;                        
                        Par.Beli=Turnir.Ostali_igraci[i++];
                        Par.Crni=Turnir.Ostali_igraci[i++];

                        Turnir.Mecevi.Add(Par);
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

    //-----------------------------------------------------------------------------------------------------------------

        /*[Route("Upisi rezultat /{FideId_Beli}/{FideId_Crni}/{Rezultat}")]
        [HttpPut]
        public async Task<ActionResult> Upisi_rezultat(int FideId_Beli,int FideId_Crni, Rezultat Rezultat)
        {
            if (FideId_Beli < 0 || FideId_Beli > 999999) return BadRequest("Pogresan FideId_Beli!");
            if (FideId_Crni < 0 || FideId_Crni > 999999) return BadRequest("Pogresan FideId_Crni!");

            try
            {
                var Mec = Context.Mecevi.Where(p => p.Beli.Fide == FideId_Beli && p.Crni.Fide==FideId_Crni).FirstOrDefault();

                Mec.Result=Rezultat;

                Context.Mecevi.Update(Mec);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o mecu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/

    //-----------------------------------------------------------------------------------------------------------------    
        
        [Route("Upisi rezultate kola/{Naziv}/{brKola}")]
        [HttpPut]
        public async Task<ActionResult> Rezultati_kolo(string Naziv,int brKola,[FromQuery]int[] rezultati)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir=Context.Turniri.Include(p=>p.Mecevi).Include(p=>p.Ostali_igraci).Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

                if(Turnir!=null)
                {
                    int i=0;

                    foreach(Mec M in Turnir.Mecevi)
                    {
                        M.Result=(Rezultat)rezultati[i];

                        if(M.Result==Rezultat.Pobeda_Beli)
                        {
                            var igrac=Context.Igraci.Where(p=>p.Fide==M.Crni.Fide).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }
                        else
                        {
                            var igrac=Context.Igraci.Where(p=>p.Fide==M.Beli.Fide).FirstOrDefault();
                            Turnir.Ostali_igraci.Remove(igrac);
                        }

                        Context.Mecevi.Add(M);
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

        [Route("Proglasi pobednika/{Naziv}")]
        [HttpPut]
        public async Task<ActionResult> Proglasi_pobednika(string Naziv)
        {
            if (Naziv == "") return BadRequest("Morate uneti ime turnira");
            if (Naziv.Length > 50) return BadRequest("Pogresna duzina naziv!");

            try
            {
                var Turnir=Context.Turniri.Include(p=>p.Ostali_igraci).Where(p=>p.Naziv.CompareTo(Naziv)==0).FirstOrDefault();

                if(Turnir!=null)
                {
                    if(Turnir.Ostali_igraci.Count==1)
                    {
                        Turnir.Pobednik=Turnir.Ostali_igraci[0];

                        var Igrac=Turnir.Ostali_igraci[0];
                        Igrac.Rejting=Igrac.Rejting+Turnir.Nagrada;

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