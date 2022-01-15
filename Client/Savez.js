import { Klub } from "./Klub.js";
import { Igrac } from "./Igrac.js";
import { Turnir } from "./Turnir.js";
import { Sudija } from "./Sudija.js";
import { Mec } from "./Mec.js";

export class Savez {

    constructor(naziv, listaIgraca, listaKlubova, listaTurnira, listaSudija, listaMeceva) {
        this.naziv = naziv;

        this.listaIgraca = listaIgraca;
        this.listaKlubova = listaKlubova;
        this.listaTurnira = listaTurnira;
        this.listaSudija = listaSudija;
        this.listaMeceva = listaMeceva;

        this.kont = null;
    }

    //#region Igrac Metode

    CrtajNaslovnu_Stranu(host) {
        this.kont = document.createElement("div");
        this.kont.className = "GlavniKontejner";
        host.appendChild(this.kont);

        let Zaglavlje = document.createElement("div");
        Zaglavlje.className = "Zaglavlje";
        this.kont.appendChild(Zaglavlje);

        let NaslovForma = document.createElement("div");
        NaslovForma.className = "NaslovForm";
        Zaglavlje.appendChild(NaslovForma);
        this.CrtajNaslov(NaslovForma);

        let KontaktForma = document.createElement("div");
        KontaktForma.className = "KontaktForm";
        Zaglavlje.appendChild(KontaktForma);
        this.CrtajKontakt(KontaktForma);

        let KontaktLab = document.createElement("label");
        KontaktLab.innerHTML = "Kontakt:" + "016458794";
        KontaktLab.className = "KontaktLab";
        //this.kont.appendChild(KontaktLab);
        KontaktForma.appendChild(KontaktLab);

        let Dugmici = ["Igraci", "Klubovi", "Turniri", "Sudije", "Mecevi"];
        var Btns = [];
        let Meni = document.createElement("div");
        Meni.className = "Meni";
        this.kont.appendChild(Meni);

        Dugmici.forEach(D => {
            var btn = document.createElement("button");
            btn.innerHTML = D;
            btn.className = "Dugmici";
            Btns.push(btn);
            Meni.appendChild(btn);
        });

        let GlavniForma = document.createElement("div");
        GlavniForma.className = "GlavnaForma";
        this.kont.appendChild(GlavniForma);


        Btns[0].onclick = (ev) => this.prikaziIgrace(GlavniForma);
        Btns[1].onclick = (ev) => this.prikaziKlubove(GlavniForma);
        Btns[2].onclick = (ev) => this.prikaziTurnire(GlavniForma);
        Btns[3].onclick = (ev) => this.prikaziSudije(GlavniForma);
        Btns[4].onclick = (ev) => this.prikaziMeceve(GlavniForma);

    }

    CrtajNaslov(host) {

        let img = document.createElement("img");
        img.src = "https://serbiachess.org/wp-content/uploads/2021/01/SSS-logo-120-100.jpg"
        host.appendChild(img);

        let l = document.createElement("label");
        l.className = "NaslovLabel";
        l.innerHTML = this.naziv;
        host.appendChild(l);
    }

    CrtajKontakt(host) {

        let img = document.createElement("img");
        img.src = "https://pngimg.com/uploads/phone/phone_PNG48921.png"
        img.height = "35";
        img.width = "35";
        host.appendChild(img);
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    DodajHeader(host, tekst) {
        var H2 = document.createElement("h2");
        H2.innerHTML = tekst;
        host.appendChild(H2);
    }

    prikaziIgrace(host) {

        this.removeAllChildNodes(host);

        this.listaIgraca = [];

        fetch("https://localhost:5001/Igrac/Svi_igraci")
            .then(p => {
                p.json().then(Igraci => {
                    Igraci.forEach(I => {
                        console.log(I);
                        var player = new Igrac(I.fide, I.ime, I.prezime, I.datum_rodjenja, I.rejting, I.titula, I.klub);
                        this.listaIgraca.push(player);
                    });

                    let FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    //#region Prikaz tabele sa Igracim

                    this.DodajHeader(FormaPrikaz, "Lista igraca");

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["FIDE", "Ime", "Prezime", "Datum rodjenja", "Rejting", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaIgraca.forEach(I => {
                        I.crtaj(IgraciTabela);
                    })

                    //#endregion 

                    //#region KontroleIgrac

                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaKontrole, "Podaci o igracu");

                    this.IscrtajKontroleIgrac(FormaKontrole);
                })
            });

        //#endregion
    }

    IscrtajKontroleIgrac(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var Kontrole = ["Dodaj igraca", "Pregledaj igraca", "Promena rejtinga", "Obrisi igraca"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleIgrac_Dodaj(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleIgrac_Pregledaj(host);
        btnsKontrole[2].onclick = (ev) => this.IscrtajKontroleIgrac_Promena(host);
        btnsKontrole[3].onclick = (ev) => this.IscrtajKontroleIgrac_Brisanje(host);
    }

    IscrtajKontroleIgrac_Pregledaj(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        //  FIDE

        var Fide = document.createElement("div");
        Fide.className = "IgracKontrole";
        PoljeKontrole.appendChild(Fide);

        var lblFide = document.createElement("label");
        lblFide.className = "LabeleKontrole";
        lblFide.innerHTML = "Fide:";
        Fide.appendChild(lblFide);

        var inputFide = document.createElement("input");
        inputFide.setAttribute("type", "text");
        inputFide.className = "InputKontrole";
        Fide.appendChild(inputFide);

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Pretrazi, Odustani;
        var Dugmici = [Pretrazi, Odustani];
        var DugmiciLabele = ["Pretrazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.PretraziIgraca(host, inputFide.value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }

    PretraziIgraca(host, FideID) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Igrac:");

        // Kontrole

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var i = 0;

        var Polja = ["Fide", "Ime", "Prezime", "Datum_Rodjenja", "Rejting", "Klub"];

        var Fide, Ime, Prezime, Dat_rodjenja, Rejting, Klub;
        var Divs = [Fide, Ime, Prezime, Dat_rodjenja, Rejting, Klub];

        var lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblKlub;
        var LabeleTekst = ["Fide:", "Ime:", "Prezime:", "Datum rodjenja:", "Rejting:", "Klub:"];
        var Labeble = [lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblKlub];

        var FidePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, RejtingPrikaz, KlubPrikaz;
        var Prikaz = [FidePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, RejtingPrikaz, KlubPrikaz];

        //---------------------------------------------------------------------------------------------------------

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Prikaz[i] = document.createElement("label");
            Prikaz[i].className = "LabeleKontrole";
            Divs[i].appendChild(Prikaz[i]);

            i++;
        })

        // Fetch

        fetch("https://localhost:5001/Igrac/Pregledaj_igraca/" + FideID)
            .then(p => {
                p.json().then(I => {

                    //console.log(I);

                    Prikaz[0].innerHTML = I.fide;
                    Prikaz[1].innerHTML = I.ime;
                    Prikaz[2].innerHTML = I.prezime;
                    var datum_rodj = new Date(I.datum_rodjenja);
                    datum_rodj = datum_rodj.toLocaleDateString('en-UK');
                    Prikaz[3].innerHTML = datum_rodj;
                    Prikaz[4].innerHTML = I.rejting;
                    Prikaz[5].innerHTML = I.klub.naziv;
                })
            })

        // Dugme Zatvori

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Zatvori";
        Odustani.className = " Zatvori"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }

    IscrtajKontroleIgrac_Dodaj(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var i = 0;

        var Polja = ["Fide", "Ime", "Prezime", "Datum_Rodjenja", "Rejting", "Titula", "Klub"];

        var Fide, Ime, Prezime, Dat_rodjenja, Rejting, Titula, Klub;
        var Divs = [Fide, Ime, Prezime, Dat_rodjenja, Rejting, Titula, Klub];

        var lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblTitula, lblKlub;
        var LabeleTekst = ["Fide:", "Ime:", "Prezime:", "Datum rodjenja:", "Rejting:", "Titula:", "Klub:"];
        var Labeble = [lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblTitula, lblKlub];

        var inputFide, inputIme, inputPrezime, inputDat_rodjenja, inputRejting, inputTitula, inputKlub;
        var Inputs = [inputFide, inputIme, inputPrezime, inputDat_rodjenja, inputRejting, inputTitula, inputKlub];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            if (i === 3) {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "date");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            } else
            if (i === 5) {

                Inputs[i] = document.createElement("select");
                Inputs[i].className = "LabeleKontrole";

                let Titule = ["MK", "FM", "IM", "GM"];

                let Title;

                Titule.forEach(T => {

                    Title = document.createElement("option");
                    Title.innerHTML = T;
                    Title.value = T.id;
                    Inputs[i].appendChild(Title);
                })

                Divs[i].appendChild(Inputs[i]);

            } else {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "text");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            }

            i++;
        })

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            // if (Inputs[0].value === "" || Inputs[1].value === "" || Inp.value === "" || inputKlub.value === "")
            //   alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.DodajIgraca(Inputs[0].value, Inputs[1].value, Inputs[2].value, Inputs[3].value, Inputs[4].value, Inputs[5].selectedIndex.value, Inputs[6].value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }

    DodajIgraca(Fide, Ime, Prezime, Dat_Rodjenja, Rejting, Kategorija, Klub) {

        fetch("https://localhost:5001/Igrac/Unos_igraca/" + Fide + "/" + Ime + "/" + Prezime + "/" + Klub + "?" + "Datum_rodjenja=" + Dat_Rodjenja + "&Rating=" + Rejting + "&Title=0", {
            method: 'POST',
            body: JSON.stringify({
                "FideId": Fide,
                "Ime": Ime,
                "Prezime": Prezime,
                "Datum_rodjenja": Dat_Rodjenja,
                "Rating": Rejting,
                "Title": Kategorija,
                "Naziv_kluba": Klub
            })
        }).then(Response => {

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");

            this.prikaziIgrace(GlavnaForma);

        });
    }

    IscrtajKontroleIgrac_Promena(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Promena rejtinga:");

        var i = 0;

        var Polja = ["Fide", "Rejting"];

        var Fide, Rejting;
        var Divs = [Fide, Rejting];

        var lblFide, lblRejting;
        var LabeleTekst = ["Fide:", "Rejting:"];
        var Labeble = [lblFide, lblRejting];

        var inputFide, inputRejting;
        var Inputs = [inputFide, inputRejting];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Promeni, Odustani;
        var Dugmici = [Promeni, Odustani];
        var DugmiciLabele = ["Promeni", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.PromeniRejting(Inputs[0].value, Inputs[1].value);
        }
        Dugmici[1].onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }

    PromeniRejting(FideId, Promena) {
        fetch("https://localhost:5001/Igrac/Promeni_rejting/" + FideId + "/" + Promena, {
            method: 'PUT',
            body: JSON.stringify({
                "FideId": FideId,
                "PromenaRejtinga": Promena
            })
        });

        let GlavnaForma = this.kont.querySelector(".GlavnaForma");

        this.prikaziIgrace(GlavnaForma);
    }

    IscrtajKontroleIgrac_Brisanje(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Brisanje igraca:");

        var i = 0;

        var Polja = ["Fide"];

        var Fide;
        var Divs = [Fide];

        var lblFide;
        var LabeleTekst = ["Fide:"];
        var Labeble = [lblFide];

        var inputFide;
        var Inputs = [inputFide];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Obrisi = document.createElement("button");
        Obrisi.innerHTML = "Obrisi";
        Obrisi.className = "DugmiciDodajOdustani";
        Btns.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.ObrisiIgraca(host, Inputs[0].value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontroleIgrac(host);
    }

    ObrisiIgraca(host, Fide) {
        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Brisanje igraca";
        host.appendChild(H2K);

        fetch("https://localhost:5001/Igrac/Brisanje_igraca/" + Fide, {
            method: 'DELETE',
            body: JSON.stringify({
                "FideId": Fide
            })
        }).then(Response => {

            let Forma = document.createElement("div");
            host.appendChild(Forma);
            let Poruka = document.createElement("h2");
            Poruka.className = "LabeleKontrole";
            Poruka.innerHTML = "Igrac je uspesno obrisan!";
            Forma.appendChild(Poruka);

            var Btns = document.createElement("div");
            Btns.className = "Meni";
            host.appendChild(Btns);

            var Odustani = document.createElement("button");
            Odustani.innerHTML = "Zatvori";
            Odustani.className = " Zatvori"
            Btns.appendChild(Odustani);

            let GlavnaForma = document.querySelector(".GlavnaForma");

            Odustani.onclick = (ev) => this.prikaziIgrace(GlavnaForma);
        });
    }

    //#endregion Igrac Metode

    //#region Klub

    prikaziKlubove(host) {

        this.removeAllChildNodes(host);

        this.listaKlubova = [];

        fetch("https://localhost:5001/Klub/Svi_klubovi")
            .then(p => {
                p.json().then(Klubovi => {
                    Klubovi.forEach(K => {
                        //console.log(K);
                        var club = new Klub(K.klubID, K.naziv, K.mesto, K.broj_Telefona, K.broj_Igraca);
                        this.listaKlubova.push(club);
                        //console.log(K);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista klubova");

                    var KluboviTabela = document.createElement("table");
                    KluboviTabela.className = "TabelaKlubovi";
                    FormaPrikaz.append(KluboviTabela);

                    var KluboviHead = document.createElement("thead");
                    KluboviTabela.appendChild(KluboviHead);

                    var tr = document.createElement("tr");
                    KluboviHead.appendChild(tr);

                    let th;
                    var Head = ["ID", "Naziv", "Mesto", "Broj telefona", "Broj igraca"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var KluboviBody = document.createElement("tbody");
                    KluboviBody.className = "KluboviPodaci";
                    KluboviTabela.appendChild(KluboviBody);

                    this.listaKlubova.forEach(K => {
                        K.crtaj(KluboviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Podaci o klubu");

                    this.IscrtajKontroleKlub(FormaKontrole);
                })
            });

    }

    IscrtajKontroleKlub(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Klub:");

        var Kontrole = ["Dodaj klub", "Igraci kluba", "Obrisi klub"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleKlub_Dodaj(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleKlub_IgraciKluba(host);
        btnsKontrole[2].onclick = (ev) => this.IscrtajKontroleKlub_Brisanje(host);
    }

    IscrtajKontroleKlub_Dodaj(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var i = 0;

        var Polja = ["Naziv", "Mesto", "Broj telefona"];

        var Naziv, Mesto, Broj_Telefona;
        var Divs = [Naziv, Mesto, Broj_Telefona];

        var lblNaziv, lblMesto, lblBroj_Telefona;
        var LabeleTekst = ["Naziv:", "Mesto:", "Broj telefona:"];
        var Labeble = [lblNaziv, lblMesto, lblBroj_Telefona];

        var inputNaziv, inputMesto, inputBroj_Telefona;
        var Inputs = [inputNaziv, inputMesto, inputBroj_Telefona];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Inputs[i] = document.createElement("input");
            Inputs[i].setAttribute("type", "text");
            Inputs[i].className = "InputKontrole";
            Divs[i].appendChild(Inputs[i]);

            i++;
        })

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            // if (Inputs[0].value === "" || Inputs[1].value === "" || Inp.value === "" || inputKlub.value === "")
            //   alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.DodajKlub(Inputs[0].value, Inputs[1].value, Inputs[2].value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleKlub(host);

    }

    DodajKlub(Naziv, Mesto, Broj_Telefona) {
        fetch("https://localhost:5001/Klub/Unos_kluba/" + Naziv + "/" + Mesto + "/" + Broj_Telefona, {
            method: 'POST',
            body: JSON.stringify({
                "Naziv": Naziv,
                "Mesto": Mesto,
                "Broj_Telefona": Broj_Telefona
            })
        }).then(Response => {

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");

            this.prikaziKlubove(GlavnaForma);

        });
    }

    IscrtajKontroleKlub_IgraciKluba(host) {

        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Igraci kluba:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Naziv = document.createElement("div");
        Naziv.className = "IgracKontrole";
        PoljeKontrole.appendChild(Naziv);

        var lblNaziv = document.createElement("label");
        lblNaziv.className = "LabeleKontrole";
        lblNaziv.innerHTML = "Naziv";
        Naziv.appendChild(lblNaziv);

        var inputNaziv = document.createElement("input");
        inputNaziv.setAttribute("type", "text");
        inputNaziv.className = "InputKontrole";
        Naziv.appendChild(inputNaziv);

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Prikazi, Odustani;
        var Dugmici = [Prikazi, Odustani];
        var DugmiciLabele = ["Prikazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            // if (Inputs[0].value === "" || Inputs[1].value === "" || Inp.value === "" || inputKlub.value === "")
            //   alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.Prikazi_Igrace_Kluba(inputNaziv.value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleKlub(host);

    }

    Prikazi_Igrace_Kluba(Naziv) {
        var FormaPrikaz = document.querySelector(".FormaPrikaz");
        this.removeAllChildNodes(FormaPrikaz);

        this.listaIgraca = [];

        fetch("https://localhost:5001/Klub/Igraci_kluba/" + Naziv)
            .then(p => {
                p.json().then(Igraci => {
                    Igraci.forEach(I => {
                        console.log(I);
                        var player = new Igrac(I.fide, I.ime, I.prezime, I.datum_rodjenja, I.rejting, I.titula, I.klub);
                        this.listaIgraca.push(player);
                    });

                    //#region Prikaz tabele sa Igracim

                    this.DodajHeader(FormaPrikaz, "Lista igraca");

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["FIDE", "Ime", "Prezime", "Datum rodjenja", "Rejting", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaIgraca.forEach(I => {
                        I.crtaj(IgraciTabela);
                    })

                    //#endregion 
                })

            });
    }

    IscrtajKontroleKlub_Brisanje(host) {

        this.removeAllChildNodes(host);
        this.DodajHeader(host, "Brisanje kluba:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        var Naziv = document.createElement("div");
        Naziv.className = "IgracKontrole";
        PoljeKontrole.appendChild(Naziv);

        var lblNaziv = document.createElement("label");
        lblNaziv.className = "LabeleKontrole";
        lblNaziv.innerHTML = "Naziv";
        Naziv.appendChild(lblNaziv);

        var inputNaziv = document.createElement("input");
        inputNaziv.setAttribute("type", "text");
        inputNaziv.className = "InputKontrole";
        Naziv.appendChild(inputNaziv);


        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Obrisi = document.createElement("button");
        Obrisi.innerHTML = "Obrisi";
        Obrisi.className = "DugmiciDodajOdustani";
        Btns.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.ObrisiKlub(host, inputNaziv.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontroleKlub(host);
    }

    ObrisiKlub(host, Naziv) {
        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Brisanje igraca";
        host.appendChild(H2K);

        fetch("https://localhost:5001/Klub/Brisanje_kluba/" + Naziv, {
            method: 'DELETE',
            body: JSON.stringify({
                "Naziv": Naziv
            })
        }).then(Response => {

            let Forma = document.createElement("div");
            host.appendChild(Forma);
            let Poruka = document.createElement("h2");
            Poruka.className = "LabeleKontrole";
            Poruka.innerHTML = "Klub" + Naziv + " je uspesno obrisan!";
            Forma.appendChild(Poruka);

            var Btns = document.createElement("div");
            Btns.className = "Meni";
            host.appendChild(Btns);

            var Odustani = document.createElement("button");
            Odustani.innerHTML = "Zatvori";
            Odustani.className = " Zatvori"
            Btns.appendChild(Odustani);

            let GlavnaForma = document.querySelector(".GlavnaForma");

            Odustani.onclick = (ev) => this.prikaziKlubove(GlavnaForma);
        });
    }

    //#endregion Klub

    //#region Sudija

    prikaziSudije(host) {

        this.removeAllChildNodes(host);

        this.listaSudija = [];

        fetch("https://localhost:5001/Sudija/Sve_sudije")
            .then(p => {
                p.json().then(Sudije => {
                    Sudije.forEach(S => {
                        //console.log(K);
                        var Arbitar = new Sudija(S.ime, S.prezime, S.kategorija);
                        this.listaSudija.push(Arbitar);
                        //console.log(K);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista sudija");

                    var SudijeTabela = document.createElement("table");
                    SudijeTabela.className = "TabelaSudije";
                    FormaPrikaz.append(SudijeTabela);

                    var SudijeHead = document.createElement("thead");
                    SudijeTabela.appendChild(SudijeHead);

                    var tr = document.createElement("tr");
                    SudijeHead.appendChild(tr);

                    let th;
                    var Head = ["Ime", "Prezime", "Kategorija"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var SudijeBody = document.createElement("tbody");
                    SudijeBody.className = "SudijePodaci";
                    SudijeTabela.appendChild(SudijeBody);

                    this.listaSudija.forEach(K => {
                        K.crtaj(SudijeTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Kontrole sudija:");

                    this.IscrtajKontroleSudija(FormaKontrole);
                })
            });

    }

    IscrtajKontroleSudija(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Klub:");

        var Kontrole = ["Dodaj sudiju", "Sudjeni turniri", "Obrisi sudiju"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleSudija_Dodaj(host);
        //btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleKlub_IgraciKluba(host);
        btnsKontrole[2].onclick = (ev) => this.IscrtajKontroleSudija_Brisanje(host);
    }

    IscrtajKontroleSudija_Dodaj(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Podaci o igracu");

        var i = 0;

        var Polja = ["Ime", "Prezime", "Kategorija"];

        var Ime, Prezime, Kategorija;
        var Divs = [Ime, Prezime, Kategorija];

        var lblIme, lblPrezime, lblKategorija;
        var LabeleTekst = ["Ime", "Prezime", "Kategorija"];
        var Labeble = [lblIme, lblPrezime, lblKategorija];

        var inputIme, inputPrezime, inputKategorija;
        var Inputs = [inputIme, inputPrezime, inputKategorija];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            if (i === 2) {
                Inputs[i] = document.createElement("select");
                Inputs[i].className = "LabeleKontrole";

                let Titule = ["NA", "IA"];

                let Title;

                let j = 0;

                Titule.forEach(T => {

                    Title = document.createElement("option");
                    Title.innerHTML = T;
                    Title.value = j++;
                    Inputs[i].appendChild(Title);
                })

                Divs[i].appendChild(Inputs[i]);
            } else {
                Inputs[i] = document.createElement("input");
                Inputs[i].setAttribute("type", "text");
                Inputs[i].className = "InputKontrole";
                Divs[i].appendChild(Inputs[i]);
            }

            i++;
        });

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            // if (Inputs[0].value === "" || Inputs[1].value === "" || Inp.value === "" || inputKlub.value === "")
            //   alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.DodajSudiju(Inputs[0].value, Inputs[1].value, Inputs[2].value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleSudija(host);
    }

    DodajSudiju(Ime, Prezime, Kategorija) {

        //console.log(Kategorija);

        fetch("https://localhost:5001/Sudija/Unos_sudije/" + Ime + "/" + Prezime + "/" + Kategorija, {
            method: 'POST',
            body: JSON.stringify({
                "Ime": Ime,
                "Prezime": Prezime,
                "Kategorija": Kategorija
            })
        }).then(Response => {

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");

            this.prikaziSudije(GlavnaForma);

        });
    }

    //#endregion Sudija

    //#region Mecevi

    prikaziMeceve(host) {
        this.removeAllChildNodes(host);

        this.listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Svi_mecevi")
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.beli, M.crni, M.turnir, M.kolo, M.result);
                        this.listaMeceva.push(mec);
                        //console.log(K);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista meceva");

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Beli", "Rezultat", "Crni", "Turnir", "Kolo"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

                    this.listaMeceva.forEach(M => {
                        console.log(M);
                        M.crtaj(MeceviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Mec:");

                    this.IscrtajKontroleMecevi(FormaKontrole);
                })
            });

    }

    IscrtajKontroleMecevi(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mec:");

        var Kontrole = ["Mecevi igraca"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleMecevi_Trazi(host);
    }

    IscrtajKontroleMecevi_Trazi(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mecevi igraca");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        //  FIDE

        var Fide = document.createElement("div");
        Fide.className = "IgracKontrole";
        PoljeKontrole.appendChild(Fide);

        var lblFide = document.createElement("label");
        lblFide.className = "LabeleKontrole";
        lblFide.innerHTML = "Fide:";
        Fide.appendChild(lblFide);

        var inputFide = document.createElement("input");
        inputFide.setAttribute("type", "text");
        inputFide.className = "InputKontrole";
        Fide.appendChild(inputFide);

        //Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Pretrazi, Odustani;
        var Dugmici = [Pretrazi, Odustani];
        var DugmiciLabele = ["Pretrazi", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.PretraziMeceveIgraca(host, inputFide.value);
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontroleMecevi(host);
    }

    PretraziMeceveIgraca(host, Fide) {

        var FormaPrikaz = document.querySelector(".FormaPrikaz");
        this.removeAllChildNodes(FormaPrikaz);

        this.listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Mecevi_igrac/" + Fide)
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.beli, M.crni, M.turnir, M.kolo, M.result);
                        this.listaMeceva.push(mec);
                        //console.log(K);
                    });

                    this.DodajHeader(FormaPrikaz, "Mecevi igraca:");

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Beli", "Rezultat", "Crni", "Turnir", "Kolo"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

                    this.listaMeceva.forEach(M => {
                        console.log(M);
                        M.crtaj(MeceviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove
                })
            });
    }

    //#endregion

    //#region  Turnir

    prikaziTurnire(host) {
        this.removeAllChildNodes(host);

        this.listaTurnira = [];
        fetch("https://localhost:5001/Turnir/Svi_turniri")
            .then(p => {
                p.json().then(Turniri => {
                    Turniri.forEach(T => {
                        //console.log(T);
                        var turnir = new Turnir(T.naziv, T.mesto, T.datum_pocetka, T.nagrada, T.klub_organizator, T.pobednik, T.sudija);
                        this.listaTurnira.push(turnir);
                    });

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Lista turnira");

                    var TurniriTabela = document.createElement("table");
                    TurniriTabela.className = "TabelaSudije";
                    FormaPrikaz.append(TurniriTabela);

                    var TurniriHead = document.createElement("thead");
                    TurniriTabela.appendChild(TurniriHead);

                    var tr = document.createElement("tr");
                    TurniriHead.appendChild(tr);

                    let th;
                    var Head = ["Naziv", "Mesto", "Datum pocetka", "Nagrada", "Klub organizator", "Pobednik", "Sudija"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var TurniriBody = document.createElement("tbody");
                    TurniriBody.className = "TurniriPodaci";
                    TurniriTabela.appendChild(TurniriBody);

                    this.listaTurnira.forEach(T => {
                        T.crtaj(TurniriTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Kontrole sudija:");

                    this.IscrtajKontroleTurnir(FormaKontrole);
                })
            });
    }

    IscrtajKontroleTurnir(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Turnir:");

        var Naziv = document.createElement("div");
        Naziv.className = "IgracKontrole";
        host.appendChild(Naziv);

        var lblNaziv = document.createElement("label");
        lblNaziv.className = "LabeleKontrole";
        lblNaziv.innerHTML = "Naziv turnira:";
        Naziv.appendChild(lblNaziv);

        var inputNaziv = document.createElement("input");
        inputNaziv.setAttribute("type", "text");
        inputNaziv.className = "InputKontrole";
        Naziv.appendChild(inputNaziv);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Pretrazi = document.createElement("button");
        Pretrazi.innerHTML = "Pretrazi";
        Pretrazi.className = "btnPretrazi"
        Btns.appendChild(Pretrazi);


        let GlavnaForma = document.querySelector(".GlavnaForma");
        Pretrazi.onclick = (ev) => this.prikaziTurnir(GlavnaForma, inputNaziv.value);
    }

    prikaziTurnir(host, NazivTurnira) {
        this.removeAllChildNodes(host);

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        host.appendChild(FormaPrikaz);

        var FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);


        this.DodajHeader(FormaPrikaz, "Turnir: " + NazivTurnira);

        this.listaTurnira = [];


        var turnir;

        this.DodajHeader(FormaPrikaz, "Lista prijavljenih igraca:");

        fetch("https://localhost:5001/Turnir/Pregledaj_turnir/" + NazivTurnira)
            .then(p => {
                p.json().then(T => {

                    turnir = new Turnir(T.naziv, T.mesto, T.datum_pocetka, T.nagrada, T.klub_organizator, T.pobednik, T.sudija);
                    this.listaTurnira.push(turnir);
                })

                //#region Prikaz tabele sa Igracim

                fetch("https://localhost:5001/Turnir/Prijavljeni_igraci/" + NazivTurnira)
                    .then(p => {
                        p.json().then(Igraci => {

                            Igraci.forEach(I => {

                                var player = new Igrac(I.fide, I.ime, I.prezime, I.datum_rodjenja, I.rejting, I.titula, I.klub);
                                //console.log(player);
                                this.listaTurnira[0].prijavljeni_Igraci.push(player);
                            })

                            var IgraciTabela = document.createElement("table");
                            IgraciTabela.className = "TabelaIgraci";
                            FormaPrikaz.append(IgraciTabela);

                            var IgraciHead = document.createElement("thead");
                            IgraciTabela.appendChild(IgraciHead);

                            var tr = document.createElement("tr");
                            IgraciHead.appendChild(tr);

                            let th;
                            var Head = ["FIDE", "Ime", "Prezime", "Datum rodjenja", "Rejting", "Klub"];
                            Head.forEach(el => {
                                th = document.createElement("th");
                                th.innerHTML = el;
                                tr.appendChild(th);
                            })

                            var IgraciBody = document.createElement("tbody");
                            IgraciBody.className = "IgraciPodaci";
                            IgraciTabela.appendChild(IgraciBody);

                            this.listaTurnira[0].prijavljeni_Igraci.forEach(I => {

                                //console.log(I);
                                I.crtaj(IgraciTabela);
                            })
                        })


                    })
            });


        this.DodajHeader(FormaKontrole, "Turnir:");

        this.IscrtajKontrole_Izabrani_Turnir(FormaKontrole);

    }

    IscrtajKontrole_Izabrani_Turnir(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Mec:");

        var Kontrole = ["Upisi igraca", "Dodaj kolo", "Upisi rezultate kola", "Proglasi pobednika"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })

        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleTurnir_UpisiIgraca(host);
        btnsKontrole[1].onclick = (ev) => this.IscrtajKontroleTurnir_DodajKolo(host);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        btnsKontrole[2].onclick = (ev) => this.Iscrtaj_Turnir_Upisi_Rezultate(GlavnaForma);
        btnsKontrole[3].onclick = (ev) => this.Proglasi_Pobednika(host);
    }

    IscrtajKontroleTurnir_UpisiIgraca(host) {
        this.removeAllChildNodes(host);
        this.DodajHeader(host, "Upisi igraca:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        // Polja za prikaz

        var Fide = document.createElement("div");
        Fide.className = "IgracKontrole";
        PoljeKontrole.appendChild(Fide);

        var lblFide = document.createElement("label");
        lblFide.className = "LabeleKontrole";
        lblFide.innerHTML = "Fide";
        Fide.appendChild(lblFide);

        var inputFide = document.createElement("input");
        inputFide.setAttribute("type", "text");
        inputFide.className = "InputKontrole";
        Fide.appendChild(inputFide);


        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj = document.createElement("button");
        Dodaj.innerHTML = "Dodaj";
        Dodaj.className = "DugmiciDodajOdustani";
        Btns.appendChild(Dodaj);

        Dodaj.onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            console.log(this.listaTurnira[0].naziv);

            console.log(inputFide.value);

            this.Dodaj_Igraca_u_Listu(this.listaTurnira[0].naziv, inputFide.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontroleKlub(host);
    }

    Dodaj_Igraca_u_Listu(Naziv, FideId) {

        console.log(Naziv);

        console.log(FideId);


        fetch("https://localhost:5001/Turnir/Upisi_igraca/" + Naziv + "/" + FideId, {
            method: 'PUT',
            body: JSON.stringify({
                "Naziv": Naziv,
                "FideId": FideId
            })
        }).then(Response => {

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");
            console.log(this.listaTurnira[0]);
            this.prikaziTurnir(GlavnaForma, this.listaTurnira[0].naziv);

        });
    }

    IscrtajKontroleTurnir_DodajKolo(host) {
        this.removeAllChildNodes(host);
        this.DodajHeader(host, "Kreiraj kolo:");

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Kolo = document.createElement("div");
        Kolo.className = "IgracKontrole";
        PoljeKontrole.appendChild(Kolo);

        var labelKolo = document.createElement("label");
        labelKolo.className = "LabeleKontrole";
        labelKolo.innerHTML = "Redni broj kola:";
        Kolo.appendChild(labelKolo);

        var inputKolo = document.createElement("select");
        inputKolo.className = "LabeleKontrole";

        let Kola = ["1", "2", "3", "4", "5"];

        let Opcija;

        let j = 1;

        Kola.forEach(K => {

            Opcija = document.createElement("option");
            Opcija.innerHTML = K;
            Opcija.value = j++;
            inputKolo.appendChild(Opcija);
        })

        Kolo.appendChild(inputKolo);

        // Dugmici

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = "DugmiciDodajOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })

        Dugmici[0].onclick = (ev) => {

            console.log("Trenutno kolo je: " + this.listaTurnira[0].kolo);

            console.log(inputKolo.value);

            if (inputKolo.value != this.listaTurnira[0].kolo)
                alert("Mozete kreirati kolo broj " + this.listaTurnira[0].kolo + "!");

            console.log(this.listaTurnira[0].ostali_Igraci);
            console.log(this.listaTurnira[0].ostali_Igraci.length);

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");

            this.Kreiraj_Kolo(GlavnaForma, inputKolo.value)
        }

        Dugmici[1].onclick = (ev) => this.IscrtajKontrole_Izabrani_Turnir(host);

        //Naoravi da kada se kreria kolo da mogu da se prikazu redom mecevi
    }

    Kreiraj_Kolo(host, brKola) {
        // Ova metoda nam vraca meceve tog kola

        this.removeAllChildNodes(host);

        if (brKola == 1) {
            this.listaTurnira[0].ostali_Igraci = this.listaTurnira[0].prijavljeni_Igraci;
        }

        if (this.listaTurnira[0].ostali_Igraci.length === 1)
            alert("Ostao je samo jedan igrac, vreme je da se proglasi pobednik!");

        this.listaTurnira[0].listaMeceva = [];

        fetch("https://localhost:5001/Turnir/Kreiraj_kolo/" + this.listaTurnira[0].naziv + "/" + brKola, {
            method: 'PUT',
            body: JSON.stringify({
                "Naziv": this.listaTurnira[0].naziv,
                "brKola": brKola
            })
        }).then(Response => {


            var GlavnaForma = document.querySelector(".GlavnaForma");
            debugger;
            this.Prikazi_Ostale_Igrace(GlavnaForma);
        });
    }

    Iscrtaj_Turnir_Upisi_Rezultate(host) {
        this.removeAllChildNodes(host);

        // Deo za prikaz meceva

        this.listaTurnira[0].Mecevi = [];

        fetch("https://localhost:5001/Turnir/Pogledaj_kolo/" + this.listaTurnira[0].naziv + "/" + this.listaTurnira[0].kolo)
            .then(p => {
                p.json().then(Mecevi => {
                    Mecevi.forEach(M => {
                        console.log(M);
                        var mec = new Mec(M.beli, M.crni, M.turnir, M.kolo, null);
                        this.listaTurnira[0].Mecevi.push(mec);
                        //console.log(K);
                    });

                    console.log(this.listaTurnira[0].kolo);

                    var FormaPrikaz = document.createElement("div");
                    FormaPrikaz.className = "FormaPrikaz";
                    host.appendChild(FormaPrikaz);

                    var FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.DodajHeader(FormaPrikaz, "Turnir " + this.listaTurnira[0].naziv + " Kolo: " + this.listaTurnira[0].kolo);

                    var MeceviTabela = document.createElement("table");
                    MeceviTabela.className = "TabelaMecevi";
                    FormaPrikaz.append(MeceviTabela);

                    var MeceviHead = document.createElement("thead");
                    MeceviTabela.appendChild(MeceviHead);

                    var tr = document.createElement("tr");
                    MeceviHead.appendChild(tr);

                    let th;
                    var Head = ["Beli", "Rezultat", "Crni"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var MeceviBody = document.createElement("tbody");
                    MeceviBody.className = "MeceviPodaci";
                    MeceviTabela.appendChild(MeceviBody);

                    this.listaTurnira[0].Mecevi.forEach(M => {
                        console.log(M);
                        M.crtaj_Turnir_Mec(MeceviTabela);
                    })

                    // Kraj za deo koji prikazuje klubove

                    // Deo koji prikazuje kontrole

                    this.DodajHeader(FormaKontrole, "Sacuvaj rezultate");

                    var Sacuvaj = document.createElement("div");
                    Sacuvaj.className = "IgracKontrole";
                    FormaKontrole.appendChild(Sacuvaj);

                    var btnSacuvaj = document.createElement("button");
                    btnSacuvaj.innerHTML = "Sacuvaj";
                    btnSacuvaj.className = "btnSacuvaj"
                    Sacuvaj.appendChild(btnSacuvaj);

                    btnSacuvaj.onclick = (ev) => this.Unesi_Rezultate_Kola();
                })
            });
    }

    Unesi_Rezultate_Kola() {

        var Rezultati = [];

        console.log(document.querySelectorAll(".mecRezultat"));

        document.querySelectorAll(".mecRezultat").forEach(R => {
            console.log(R);
            Rezultati.push(R.value);
        });

        //console.log(Rezultati);
        var StringF = "https://localhost:5001/Turnir/Upisi_rezultate_kola/" + this.listaTurnira[0].naziv + "/" + this.listaTurnira[0].kolo + "?";



        Rezultati.forEach(R => {
            StringF = StringF + "rezultati=" + R + "&";
        })

        var String_Fetch = StringF.substring(0, StringF.length - 1);
        console.log(String_Fetch);

        fetch(String_Fetch, {
            method: 'PUT',
            body: JSON.stringify({
                "Naziv": this.listaTurnira[0].naziv,
                "brKola": this.listaTurnira[0].kolo
            })
        }).then(Response => {

            this.listaTurnira[0].kolo = this.listaTurnira[0].kolo + 1;

            let GlavnaForma = this.kont.querySelector(".GlavnaForma");
            this.Prikazi_Ostale_Igrace(GlavnaForma);
        });
    }

    Prikazi_Ostale_Igrace(host) {

        this.removeAllChildNodes(host);
        this.listaTurnira[0].ostali_Igraci = [];

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        host.appendChild(FormaPrikaz);

        if (this.listaTurnira[0].kolo == 1) {
            this.DodajHeader(FormaPrikaz, "Prijavljeni igraci");
        } else {
            this.DodajHeader(FormaPrikaz, "Ostali igraci nakon " + this.listaTurnira[0].kolo + ". kola:");
        }
        var FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);

        fetch("https://localhost:5001/Turnir/Ostali_igraci/" + this.listaTurnira[0].naziv)
            .then(p => {
                p.json().then(Igraci => {

                    Igraci.forEach(I => {

                        var player = new Igrac(I.fide, I.ime, I.prezime, I.datum_rodjenja, I.rejting, I.titula, I.klub);
                        //console.log(player);
                        this.listaTurnira[0].ostali_Igraci.push(player);
                    })

                    var IgraciTabela = document.createElement("table");
                    IgraciTabela.className = "TabelaIgraci";
                    FormaPrikaz.append(IgraciTabela);

                    var IgraciHead = document.createElement("thead");
                    IgraciTabela.appendChild(IgraciHead);

                    var tr = document.createElement("tr");
                    IgraciHead.appendChild(tr);

                    let th;
                    var Head = ["FIDE", "Ime", "Prezime", "Datum rodjenja", "Rejting", "Klub"];
                    Head.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })

                    var IgraciBody = document.createElement("tbody");
                    IgraciBody.className = "IgraciPodaci";
                    IgraciTabela.appendChild(IgraciBody);

                    this.listaTurnira[0].ostali_Igraci.forEach(I => {

                        //console.log(I);
                        I.crtaj(IgraciTabela);
                    })
                })


            })

        this.DodajHeader(FormaKontrole, "Turnir:");

        this.IscrtajKontrole_Rezultati(FormaKontrole);
    }

    IscrtajKontrole_Rezultati(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Tok turnira");

        var Kontrole = ["Dodaj kolo", "Upisi rezultate kola", "Proglasi pobednika"];
        var btnsKontrole = [];

        Kontrole.forEach(K => {
            var btn = document.createElement("button");
            btn.innerHTML = K;
            btn.className = "DugmiciKontrole";
            btnsKontrole.push(btn);
            host.appendChild(btn);
        })


        btnsKontrole[0].onclick = (ev) => this.IscrtajKontroleTurnir_DodajKolo(host);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        btnsKontrole[1].onclick = (ev) => this.Iscrtaj_Turnir_Upisi_Rezultate(GlavnaForma);
        btnsKontrole[2].onclick = (ev) => this.Proglasi_Pobednika(host);
    }


    Proglasi_Pobednika(host) {
        this.removeAllChildNodes(host);

        fetch("https://localhost:5001/Turnir/Proglasi_pobednika/" + this.listaTurnira[0].naziv, {
            method: 'PUT',
            body: JSON.stringify({
                "Naziv": this.listaTurnira[0].naziv,
            })
        }).then(Response => {
            this.DodajHeader(host, "Pobednik turnira " + this.listaTurnira[0].naziv + " je:");
            debugger;
            this.Prikazi_Pobednika(host, this.listaTurnira[0].pobednik.fide);
            debugger;
        });
    }

    Prikazi_Pobednika(host) {
        this.removeAllChildNodes(host);

        this.DodajHeader(host, "Igrac:");

        // Kontrole

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var i = 0;

        var Polja = ["Fide", "Ime", "Prezime", "Datum_Rodjenja", "Rejting", "Klub"];

        var Fide, Ime, Prezime, Dat_rodjenja, Rejting, Klub;
        var Divs = [Fide, Ime, Prezime, Dat_rodjenja, Rejting, Klub];

        var lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblKlub;
        var LabeleTekst = ["Fide:", "Ime:", "Prezime:", "Datum rodjenja:", "Rejting:", "Klub:"];
        var Labeble = [lblFide, lblIme, lblPrezime, lblDatRodjenja, lblRejting, lblKlub];

        var FidePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, RejtingPrikaz, KlubPrikaz;
        var Prikaz = [FidePrikaz, ImePrikaz, PrezimePrikaz, Dat_rodjenjaPrikaz, RejtingPrikaz, KlubPrikaz];

        //---------------------------------------------------------------------------------------------------------

        Polja.forEach(D => {

            Divs[i] = document.createElement("div");
            Divs[i].className = "IgracKontrole";
            PoljeKontrole.appendChild(Divs[i]);

            Labeble[i] = document.createElement("label");
            Labeble[i].className = "LabeleKontrole";
            Labeble[i].innerHTML = LabeleTekst[i];
            Divs[i].appendChild(Labeble[i]);

            Prikaz[i] = document.createElement("label");
            Prikaz[i].className = "LabeleKontrole";
            Divs[i].appendChild(Prikaz[i]);

            i++;
        })

        // Fetch

        fetch("https://localhost:5001/Igrac/Pregledaj_igraca/" + FideID)
            .then(p => {
                p.json().then(I => {

                    //console.log(I);

                    Prikaz[0].innerHTML = I.fide;
                    Prikaz[1].innerHTML = I.ime;
                    Prikaz[2].innerHTML = I.prezime;
                    var datum_rodj = new Date(I.datum_rodjenja);
                    datum_rodj = datum_rodj.toLocaleDateString('en-UK');
                    Prikaz[3].innerHTML = datum_rodj;
                    Prikaz[4].innerHTML = I.rejting;
                    Prikaz[5].innerHTML = I.klub.naziv;
                })
            })

        // Dugme Zatvori

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Zatvori = document.createElement("button");
        Zatvori.innerHTML = "Zatvori";
        Zatvori.className = " Zatvori"
        Btns.appendChild(Zatvori);

        let GlavnaForma = document.querySelector(".GlavnaForma");
        Zatvori.onclick = (ev) => this.prikaziTurnire(GlavnaForma);
    }



    //#endregion

}