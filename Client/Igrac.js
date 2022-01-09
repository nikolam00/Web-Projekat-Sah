export class Igrac {

    constructor(fide, ime, prezime, datum_rodj, rejting, title, klub) {
        this.fide = fide;
        this.ime = ime;
        this.prezime = prezime;

        this.datum_rodj = new Date(datum_rodj);
        this.datum_rodj = this.datum_rodj.toLocaleDateString('en-UK');
        this.rejting = rejting;
        this.titula = title;
        this.klub = klub;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.fide;
        el.className = "PoljeTabela";
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.datum_rodj;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.rejting;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.klub.naziv;
        tr.appendChild(el);

    }


}