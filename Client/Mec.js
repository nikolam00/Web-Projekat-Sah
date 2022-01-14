export class Mec {

    constructor(beli, crni, turnir, kolo, result) {
        this.beli = beli;
        this.crni = crni;
        this.turnir = turnir;
        this.kolo = kolo;
        this.result = result;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        console.log(this.beli);
        el.innerHTML = this.beli.prezime + " " + this.beli.ime;
        tr.appendChild(el);

        var Rezultat = ["1 : 0", "1/2 : 1/2", "0 : 1"];

        var el = document.createElement("td");
        el.innerHTML = Rezultat[this.result];
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.crni.prezime + " " + this.crni.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.turnir.naziv;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.kolo;
        tr.appendChild(el);
    }

    crtaj_Turnir_Mec(host) {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        console.log(this.beli);
        el.innerHTML = this.beli.prezime + " " + this.beli.ime;
        tr.appendChild(el);

        var Rezultat = ["1 : 0", "1/2 : 1/2", "0 : 1"];

        var el = document.createElement("td");

        if (this.result != null) {

            el.innerHTML = Rezultat[this.result];
        } else {
            var Select = document.createElement("select");
            Select.className = "mecRezultat";

            let Opcija;

            let j = 0;

            Rezultat.forEach(R => {

                Opcija = document.createElement("option");
                Opcija.innerHTML = R;
                Opcija.value = j++;
                Select.appendChild(Opcija);
            })

            el.appendChild(Select);
        }
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.crni.prezime + " " + this.crni.ime;
        tr.appendChild(el);
    }
}