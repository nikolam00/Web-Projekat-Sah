import { Klub } from "./Klub.js";
import { Igrac } from "./Igrac.js";


var ListaIgraca = [];
var ListaKlubova = [];
var ListaTurnira = [];
var ListaSudija = [];




fetch("https://localhost:5001/Klub/Svi_klubovi")
    .then(p => {
        p.json().then(Klubovi => {
            Klubovi.forEach(K => {
                var club = new Klub(K.klubID, K.naziv, K.mesto, K.broj_Telefona);
                ListaKlubova.push(club);
                console.log(K);
            });
        })
})

fetch("https://localhost:5001/Igrac/Svi_igraci")
    .then(p => {
        p.json().then(Igraci => {
            Igraci.forEach(I => {
                //console.log(I);
                var player = new Igrac(I.fide,I.ime,I.prezime,I.datum_rodjenja,I.rejting,I.titula);
                ListaKlubova.push(player);
                console.log(player);
            });
        })
})



