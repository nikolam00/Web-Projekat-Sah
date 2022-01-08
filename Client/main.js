import { Klub } from "./Klub.js";
import { Igrac } from "./Igrac.js";
import { Turnir } from "./Turnir.js";
import { Sudija } from "./Sudija.js";
import { Mec } from "./Mec.js";
import { Savez } from "./Savez.js";


var ListaIgraca = [];
var ListaKlubova = [];
var ListaTurnira = [];
var ListaSudija = [];
var ListaMeceva = [];

fetch("https://localhost:5001/Klub/Svi_klubovi")
    .then(p => {
        p.json().then(Klubovi => {
            Klubovi.forEach(K => {
                //console.log(K);
                var club = new Klub(K.klubID, K.naziv, K.mesto, K.broj_Telefona);
                ListaKlubova.push(club);
                //console.log(K);
            });

            // Ovde treba da se ubacuju redom ucitavanje za ostalo, ulancavaju se u then 
        })

        fetch("https://localhost:5001/Igrac/Svi_igraci")
            .then(p => {
                p.json().then(Igraci => {
                    Igraci.forEach(I => {
                        //console.log(I);
                        var player = new Igrac(I.fide, I.ime, I.prezime, I.datum_rodjenja, I.rejting, I.titula, I.klub);
                        ListaIgraca.push(player);
                        //console.log(player);
                    });
                })

                fetch("https://localhost:5001/Turnir/Svi_turniri")
                    .then(p => {
                        p.json().then(Turniri => {
                            Turniri.forEach(T => {
                                //console.log(T);
                                var turnir = new Turnir(T.naziv, T.mesto, T.datum_pocetka, T.nagrada);
                                ListaTurnira.push(turnir);
                                //console.log(turnir);
                            });
                        })

                        fetch("https://localhost:5001/Sudija/Sve_sudije")
                            .then(p => {
                                p.json().then(Sudije => {
                                    Sudije.forEach(S => {
                                        //console.log(S);
                                        var arbitar = new Sudija(S.ime, S.prezime, S.kategorija);
                                        ListaSudija.push(arbitar);
                                        //console.log(arbitar);
                                    });
                                })

                                fetch("https://localhost:5001/Turnir/Svi_mecevi")
                                    .then(p => {
                                        p.json().then(Mecevi => {
                                            Mecevi.forEach(M => {
                                                //console.log(M);
                                                var mec = new Mec(M.beli, M.crni, M.turnir, M.kolo, M.result);

                                                ListaMeceva.push(mec);
                                                //console.log(mec);


                                            });

                                        })
                                    })

                            })
                    })
            })
    })

var SSJO = new Savez("Sahovski savez Jablanickog okruga", ListaIgraca, ListaKlubova, ListaTurnira, ListaSudija, ListaMeceva);

SSJO.CrtajNaslovnu_Stranu(document.body);

console.log(SSJO);