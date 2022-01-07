export class Klub {
    
    constructor(id, naziv, mesto, br_Tel) {
        this.id = id;
        this.naziv = naziv;
        this.mesto = mesto;
        this.br_Tel = br_Tel;
    }





    DodajKlub(ListaKlubova, Naziv) {
        fetch("https://localhost:5001/Klub/Pregledaj_klub/" + Naziv,
            {
                method: "GET"
            })
            .then(p => {
                p.json().then(K => {
                    var club = new Klub(K.klubID, K.naziv, K.mesto, K.broj_Telefona);

                    club.id = K.klubID;
                    club.naziv = K.naziv;
                    club.mesto = K.mesto;
                    club.br_Tel = K.broj_Telefona;

                    console.log(club);

                    ListaKlubova.push(club);
                }
                )
            })
    }
    
}

