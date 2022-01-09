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
        Btns[4].onclick = (ev) => this.prikaziIgrace(GlavniForma);

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

    prikaziIgrace(host) {

        this.removeAllChildNodes(host);

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        host.appendChild(FormaPrikaz);

        let FormaKontrole = document.createElement("div");
        FormaKontrole.className = "FormaKontrole";
        host.appendChild(FormaKontrole);

        // Deo za levi deo diva, tu cemo da prikazujemo igrace
        var H2 = document.createElement("h2");
        H2.innerHTML = "Lista igraca";
        FormaPrikaz.appendChild(H2);

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

        // Kraj za deo koji prikazuje igrace

        // Deo koji prikazuje kontrole

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Podaci o igracu";
        FormaKontrole.appendChild(H2K);

        this.IscrtajKontrole(FormaKontrole);


        //this.IscrtajKontroleIgrac_Dodaj(FormaKontrole);

    }

    IscrtajKontrole(host) {
        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Podaci o igracu";
        host.appendChild(H2K);

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

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Podaci o igracu";
        host.appendChild(H2K);

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

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

        var Pretrazi = document.createElement("button");
        Pretrazi.innerHTML = "Pretrazi";
        Pretrazi.className = "DugmiciDodajOdustani";
        Btns.appendChild(Pretrazi);

        Pretrazi.onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.PretraziIgraca(host, inputFide.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontrole(host);
    }

    PretraziIgraca(host, FideID) {

        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Igrac:";
        host.appendChild(H2K);

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        // Polja za prikaz

        var Fide = document.createElement("div");
        Fide.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Fide);

        var lblFide = document.createElement("label");
        lblFide.className = "LabeleKontrole";
        lblFide.innerHTML = "Fide:";
        Fide.appendChild(lblFide);

        var FidePrikaz = document.createElement("label");
        FidePrikaz.className = "LabeleKontrole";
        Fide.appendChild(FidePrikaz);

        //  IME

        var Ime = document.createElement("div");
        Ime.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Ime);

        var lblIme = document.createElement("label");
        lblIme.className = "LabeleKontrole";
        lblIme.innerHTML = "Ime:";
        Ime.appendChild(lblIme);

        var ImePrikaz = document.createElement("label");
        ImePrikaz.className = "LabeleKontrole";
        Ime.appendChild(ImePrikaz);

        //  PREZIME

        var Prezime = document.createElement("div");
        Prezime.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Prezime);

        var lblPrezime = document.createElement("label");
        lblPrezime.className = "LabeleKontrole";
        lblPrezime.innerHTML = "Prezime:";
        Prezime.appendChild(lblPrezime);

        var PrezimePrikaz = document.createElement("label");
        PrezimePrikaz.className = "LabeleKontrole";
        Prezime.appendChild(PrezimePrikaz);

        // Datum_rodjenja

        var Datum = document.createElement("div");
        Datum.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Datum);

        var lblDatum = document.createElement("label");
        lblDatum.className = "LabeleKontrole";
        lblDatum.innerHTML = "Datum:";
        Datum.appendChild(lblDatum);

        var DatumPrikaz = document.createElement("label");
        DatumPrikaz.className = "LabeleKontrole";
        Datum.appendChild(DatumPrikaz);

        //  Rejting

        var Rejting = document.createElement("div");
        Rejting.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Rejting);

        var lblRejting = document.createElement("label");
        lblRejting.className = "LabeleKontrole";
        lblRejting.innerHTML = "Rejting:";
        Rejting.appendChild(lblRejting);

        var RejtingPrikaz = document.createElement("label");
        RejtingPrikaz.className = "LabeleKontrole";
        Rejting.appendChild(RejtingPrikaz);

        //  Klub

        var Klub = document.createElement("div");
        Klub.className = "LabeleKontrole";
        PoljeKontrole.appendChild(Klub);

        var lblKlub = document.createElement("label");
        lblKlub.className = "LabeleKontrole";
        lblKlub.innerHTML = "Klub:";
        Klub.appendChild(lblKlub);

        var KlubPrikaz = document.createElement("label");
        KlubPrikaz.className = "LabeleKontrole";
        Klub.appendChild(KlubPrikaz);

        console.log(Fide);

        fetch("https://localhost:5001/Igrac/Pregledaj_igraca/" + FideID)
            .then(p => {
                p.json().then(I => {

                    console.log(I);

                    FidePrikaz.innerHTML = I.fide;
                    ImePrikaz.innerHTML = I.ime;
                    PrezimePrikaz.innerHTML = I.prezime;
                    var datum_rodj = new Date(I.datum_rodjenja);
                    datum_rodj = datum_rodj.toLocaleDateString('en-UK');
                    DatumPrikaz.innerHTML = datum_rodj;
                    RejtingPrikaz.innerHTML = I.rejting;
                    KlubPrikaz.innerHTML = I.klub.naziv;
                })
            })

        // Dugme Zatvori

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Zatvori";
        Odustani.className = " Zatvori"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontrole(host);
    }

    IscrtajKontroleIgrac_Dodaj(host) {

        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Podaci o igracu";
        host.appendChild(H2K);

        var Kontrole = ["Ime:", "Prezime:", "Datum rodjenja:", "Rejting:", "Titula:", "Klub:"];

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);


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

        //      Ime

        var Ime = document.createElement("div");
        Ime.className = "IgracKontrole";
        PoljeKontrole.appendChild(Ime);

        var lblIme = document.createElement("label");
        lblIme.className = "LabeleKontrole";
        lblIme.innerHTML = "Ime:";
        Ime.appendChild(lblIme);

        var inputIme = document.createElement("input");
        inputIme.setAttribute("type", "text");
        inputIme.className = "InputKontrole";
        Ime.appendChild(inputIme);

        //      Prezime

        var Prezime = document.createElement("div");
        Prezime.className = "IgracKontrole";
        PoljeKontrole.appendChild(Prezime);

        var lblPrezime = document.createElement("label");
        lblPrezime.className = "LabeleKontrole";
        lblPrezime.innerHTML = "Prezime:";
        Prezime.appendChild(lblPrezime);

        var inputPrezime = document.createElement("input");
        inputPrezime.setAttribute("type", "text");
        inputPrezime.className = "InputKontrole";
        Prezime.appendChild(inputPrezime);

        var Dat_rodjenja = document.createElement("div");
        Dat_rodjenja.className = "IgracKontrole";
        PoljeKontrole.appendChild(Dat_rodjenja);

        var lblDatum_rodj = document.createElement("lbl");
        lblDatum_rodj.className = "LabeleKontrole";
        lblDatum_rodj.innerHTML = "Datum rodjenja:";
        Dat_rodjenja.appendChild(lblDatum_rodj);

        var inputDatum_Rodj = document.createElement("input");
        inputDatum_Rodj.setAttribute("type", "date");
        inputDatum_Rodj.className = "InputKontrole";
        Dat_rodjenja.appendChild(inputDatum_Rodj);

        //  Rejting

        var Rejting = document.createElement("div");
        Rejting.className = "IgracKontrole";
        PoljeKontrole.appendChild(Rejting);

        var lblRejting = document.createElement("label");
        lblRejting.className = "LabeleKontrole";
        lblRejting.innerHTML = "Rejting:";
        Rejting.appendChild(lblRejting);

        var inputRejting = document.createElement("input");
        inputRejting.className = "InputKontrole";
        inputRejting.setAttribute("type", "text");
        Rejting.appendChild(inputRejting);

        // Titula

        var Titula = document.createElement("div");
        Titula.className = "IgracKontrole";
        PoljeKontrole.appendChild(Titula);

        var lblTitula = document.createElement("label");
        lblTitula.className = "LabeleKontrole";
        lblTitula.innerHTML = "Titula:";
        Titula.appendChild(lblTitula);

        var TitulaS = document.createElement("select");
        TitulaS.className = "LabeleKontrole";
        var Titule = ["MK", "FM", "IM", "GM"];

        let Title;

        Titule.forEach(T => {

            Title = document.createElement("option");
            Title.innerHTML = T;
            Title.value = T.id;
            TitulaS.appendChild(Title);
        })

        Titula.appendChild(TitulaS);

        // Klub

        var Klub = document.createElement("div");
        Klub.className = "IgracKontrole";
        PoljeKontrole.appendChild(Klub);

        var lblKlub = document.createElement("label");
        lblKlub.className = "LabeleKontrole";
        lblKlub.innerHTML = "Klub:";
        Klub.appendChild(lblKlub);

        var inputKlub = document.createElement("input");
        inputKlub.className = "InputKontrole";
        inputKlub.setAttribute("type", "text");
        Klub.appendChild(inputKlub);


        //Dugmici

        var Dodaj = document.createElement("button");
        Dodaj.innerHTML = "Dodaj";
        Dodaj.className = "DugmiciDodajOdustani";
        Btns.appendChild(Dodaj);

        Dodaj.onclick = (ev) => {
            if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
                alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.DodajIgraca(inputFide.value, inputIme.value, inputPrezime.value, inputDatum_Rodj.value, inputRejting.value, TitulaS.selectedIndex.value, inputKlub.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontrole(host);
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
        });

        let GlavnaForma = this.kont.querySelector(".GlavnaForma");

        this.prikaziIgrace(GlavnaForma);
    }

    IscrtajKontroleIgrac_Promena(host) {
        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Promena rejtinga:";
        host.appendChild(H2K);

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        // Polja za prikaz

        // Fide 

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

        // Rejting

        var Rejting = document.createElement("div");
        Rejting.className = "IgracKontrole";
        PoljeKontrole.appendChild(Rejting);

        var lblRejting = document.createElement("label");
        lblRejting.className = "LabeleKontrole";
        lblRejting.innerHTML = "Promena:";
        Rejting.appendChild(lblRejting);

        var inputRejting = document.createElement("input");
        inputRejting.setAttribute("type", "text");
        inputRejting.className = "InputKontrole";
        Rejting.appendChild(inputRejting);

        //Dugmici

        var Promeni = document.createElement("button");
        Promeni.innerHTML = "Promeni";
        Promeni.className = "DugmiciDodajOdustani";
        Btns.appendChild(Promeni);

        Promeni.onclick = (ev) => {
            //if (inputFide.value === "" || inputIme.value === "" || inputPrezime.value === "" || inputKlub.value === "")
            //    alert("Morate uneti podatke za Fide, Ime, Prezime i Klub!");

            this.PromeniRejting(inputFide.value, inputRejting.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = " DugmiciDodajOdustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.IscrtajKontrole(host);
    }

    PromeniRejting(FideId, Promena) {
        fetch("https://localhost:5001/Igrac/Promeni_rejting/" + FideId + "/" + Promena, {
            method: 'PUT',
            body: JSON.stringify({
                "FideId": FideId,
                "PromenaRejtinga": Promena
            })
        });

    }

    IscrtajKontroleIgrac_Brisanje(host) {
        this.removeAllChildNodes(host);

        var H2K = document.createElement("h2");
        H2K.innerHTML = "Brisanje igraca:";
        host.appendChild(H2K);

        var PoljeKontrole = document.createElement("div");
        PoljeKontrole.className = "IgracKontrole";
        host.appendChild(PoljeKontrole);

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

            this.ObrisiIgraca(host, inputFide.value);
        }
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
        });

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

        Odustani.onclick = (ev) => this.IscrtajKontrole(host);
    }








}