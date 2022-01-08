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

    prikaziIgrace(host) {

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

        //this.IscrtajKontroleIgrac(FormaKontrole);
        // Pogledaj da ne izlazi svaki put kad kliknes nova tabela

    }

    /*IscrtajKontrolIgrac(host) {
        var Kontrole = ["Ime:", "Prezime:", "Datum rodjenja:", "Rejting:", "Titula:", "Klub:"];

        Kontrole.forEach(K => {
            var
        })

        var Ime = document.createElement("div");
        Ime.className = "IgracKontrole";
        host.appendChild(Ime);

        var Prezime = document.createElement("div");
        Prezime.className = "IgracKontrole";
        host.appendChild(Prezime);

        var Dat_rodjenja = document.createElement("div");
        Dat_rodjenja.className = "IgracKontrole";
        host.appendChild(Dat_rodjenja);

        var Rejting = document.createElement("div");
        Dat_rodjenja.className = "IgracKontrole";
        host.appendChild(Dat_rodjenja);
    }*/

    /*prikaziKlubove(host) {

        let FormaPrikaz = document.createElement("div");
        FormaPrikaz.className = "FormaPrikaz";
        FormaPrikaz.id = "FormPrikaz";
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

        // Pogledaj da ne izlazi svaki put kad kliknes nova tabela

    }*/



}