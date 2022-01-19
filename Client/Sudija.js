export class Sudija {

    constructor(ime, prezime, kategorija) {
        this.ime = ime;
        this.prezime = prezime;
        this.kategorija = kategorija;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        if (this.kategorija == 0) {
            el.innerHTML = "Nacionalni";
        } else
            el.innerHTML = "Internacionalni";
        tr.appendChild(el);
    }
}