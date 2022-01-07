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
        KontaktLab.innerHTML = "Kontakt: 016458794";
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


}