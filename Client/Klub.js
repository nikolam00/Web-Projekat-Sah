export class Klub {

    constructor(id, naziv, mesto, br_Tel) {
        this.id = id;
        this.naziv = naziv;
        this.mesto = mesto;
        this.br_Tel = br_Tel;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.id;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.naziv;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.mesto;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.br_Tel;
        tr.appendChild(el);

    }





}