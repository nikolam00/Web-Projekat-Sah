export class Turnir {

    constructor(naziv, mesto, datum_poc, nagrada, klub, pobednik, sudija) {
        this.naziv = naziv;
        this.klub = klub;
        this.datum_pocetka = new Date(datum_poc);
        this.datum_pocetka = this.datum_pocetka.toLocaleDateString('en-UK');

        this.mesto = mesto;
        this.nagrada = nagrada;
        this.pobednik = pobednik;
        this.sudija = sudija;

        this.kolo = 1;

        this.prijavljeni_Igraci = [];
        this.Mecevi = [];
        this.ostali_Igraci = [];
    }

    crtaj(host) {
        var tr = document.createElement("tr");
        tr.className = "RedTurnir";
        host.appendChild(tr);

        var el = document.createElement("td");
        el.className = "NazivTurnira";
        el.innerHTML = this.naziv;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.datum_pocetka;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.mesto;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.nagrada;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.klub.naziv;
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.pobednik != null) {
            el.innerHTML = this.pobednik.ime + " " + this.pobednik.prezime;
        } else
            el.innerHTML = "";
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.sudija != null) {
            el.innerHTML = this.sudija.ime + " " + this.sudija.prezime;
        } else
            el.innerHTML = "";
        tr.appendChild(el);
    }
}