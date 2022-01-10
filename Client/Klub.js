export class Klub {

    constructor(id, naziv, mesto, br_Tel, br_Igraca) {
        this.id = id;
        this.naziv = naziv;
        this.mesto = mesto;
        this.br_Tel = br_Tel;
        this.br_Igraca = br_Igraca;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var Elementi = [this.id, this.naziv, this.mesto, this.br_Tel, this.br_Igraca];

        Elementi.forEach(E => {
            var el = document.createElement("td");
            el.innerHTML = E;
            tr.appendChild(el);
        });
    }

}