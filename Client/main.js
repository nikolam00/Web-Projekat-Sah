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


var SSJO = new Savez("Sahovski savez Jablanickog okruga", ListaIgraca, ListaKlubova, ListaTurnira, ListaSudija, ListaMeceva);

SSJO.CrtajNaslovnu_Stranu(document.body);

var SSNO = new Savez("Sahovski savez Nisavskog okruga", ListaIgraca, ListaKlubova, ListaTurnira, ListaSudija, ListaMeceva);

//SSNO.CrtajNaslovnu_Stranu(document.body);

//console.log(SSJO);