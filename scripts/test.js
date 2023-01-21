"use strict";

import Category from "./Category.js";
import Person from "./Person.js";
import Production from "./Production.js";
import VideoSystem from "./VideoSystem.js";

console.log("*****Test completo del funcionamiento de nuestra apliación*****");
console.log("------------------------------------------------------------");

// VideoSystem
console.log("Obtenemos la instancia de VideoSystem");
let videosystem = VideoSystem.getInstance("Netflix");
console.log(videosystem.name);

console.log("");

console.log("Obtenemos una segunda instancia de VideoSystem diferente");
let videosystem2 = VideoSystem.getInstance("Amazon")
console.log(videosystem2.name);

console.log("");

console.log("Cambiamos el nombre a la primera instancia");
videosystem.name="Amazon";
console.log("Primera instancia " + videosystem.name);
console.log("Segunda instancia " + videosystem2.name);

console.log("");
console.log("------------------------------------------------------------");
console.log("");

// Categories
console.log("***Factory de categoría***");
let cat1 = videosystem.getCategory("Fantasy");
let cat2 = videosystem.getCategory("Comedy");
let cat3 = videosystem.getCategory("Horror");
console.log("Añadimos las categorías: ");
console.log(videosystem.addCategory(cat1));
console.log(videosystem.addCategory(cat2));
console.log(videosystem.addCategory(cat3));

try {
    console.log("");
    console.log("Añadimos una categoría existente");
    videosystem.addCategory(cat1);
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos una algo que no es una categoría");
    videosystem.addCategory("cat1");
} catch (error) {
    console.log(error.message);
}
try {
    console.log("");
    console.log("Eliminamos una categoría existente");
    console.log(videosystem.removeCategory(cat1));
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos una categoría que no existe");
    console.log(videosystem.removeCategory(cat1));
} catch (error) {
    console.log(error.message);
}

console.log("");
showCategories();

console.log("------------------------------------------------------------");
console.log("");

// Users
console.log("***Factory de usuarios***");
let user3 = videosystem.getUser("Javier", "javiermb@gmail.com", "Abcd1234");
let user2 = videosystem.getUser("Fernando", "fernandomb@gmail.com", "Abcd1234");
let user1 = videosystem.getUser("David", "davidlm@gmail.com", "Abcd1234");

console.log("Añadimos los usuarios: ");
console.log(videosystem.addUser(user1));
console.log(videosystem.addUser(user2));
console.log(videosystem.addUser(user3));

try {
    console.log("");
    console.log("Añadimos un usuario existente");
    videosystem.addUser(user1)
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos una algo que no es un usuario");
    videosystem.addUser("cat1");
} catch (error) {
    console.log(error.message);
}
try {
    console.log("");
    console.log("Eliminamos un usuario existente");
    console.log(videosystem.removeUser(user1));
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos un usuario que no existe");
    console.log(videosystem.removeUser(user1));
} catch (error) {
    console.log(error.message);
}

console.log("");
showUsers();

console.log("------------------------------------------------------------");
console.log("");
console.log("***Factory de producciones Movie y Serie***");

// Productions
var movie1 = videosystem.getMovie("Pirulo", "", "28/02/2002", "", "");
var serie1 = videosystem.getSerie("Pirulo La Serie", "", "28/02/2002", "", "");
var movie2 = videosystem.getMovie("Pirulo 2 la fiesta continua", "", "28/02/2002", "", "");

console.log("Añadimos las producciones: ");
console.log(videosystem.addProduction(movie1));
console.log(videosystem.addProduction(serie1));
console.log(videosystem.addProduction(movie2));

try {
    console.log("Intentamos crear un objeto producción");
    let production = new Production();
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos una producción existente");
    videosystem.addProduction(movie1)
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos algo que no es una producción");
    videosystem.addProduction("cat1");
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos una producción existente");
    console.log(videosystem.removeProduction(movie2));
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos una producción que no existe");
    console.log(videosystem.removeProduction(movie2));
} catch (error) {
    console.log(error.message);
}

console.log("");
showProductions();

console.log("------------------------------------------------------------");
console.log("");

// Actors
console.log("***Factory de Actores***");
var actor1 = videosystem.getActor("Fernando", "Tejero", "", "12345678A", "24/02/1967");
var actor2 = videosystem.getActor("Fermin", "Trujillo", "", "12345679A", "26/02/1967");
var actor3 = videosystem.getActor("Anónimo", "Trujillo", "", "12345629A", "26/02/1967");


console.log("Añadimos los actores: ");
console.log(videosystem.addActor(actor1));
console.log(videosystem.addActor(actor2));
console.log(videosystem.addActor(actor3));

try {
    console.log("");
    console.log("Añadimos un actor existente");
    videosystem.addActor(actor1)
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos algo que no es un actor");
    videosystem.addActor("actor1")
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos un actor existente");
    console.log(videosystem.removeActor(actor3));
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos un actor que no existe");
    console.log(videosystem.removeActor(actor3));
} catch (error) {
    console.log(error.message);
}

console.log("");
showActors();

console.log("------------------------------------------------------------");
console.log("");

// Directors
console.log("***Factory de Directores***");
var director1 = videosystem.getDirector("Sergio", "Dalma", "", "12345678A", "24/02/1967");
var director2 = videosystem.getDirector("Ramón", "Melendi", "", "12345679A", "26/02/1967");
var director3 = videosystem.getDirector("Fermin", "trujillo", "", "12341679A", "26/02/1967");

console.log("Añadimos los directores: ");
console.log(videosystem.addDirector(director1));
console.log(videosystem.addDirector(director2));
console.log(videosystem.addDirector(director3));

try {
    console.log("");
    console.log("Añadimos un director existente");
    videosystem.addDirector(director1)
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Añadimos algo que no es un director");
    videosystem.addDirector("actor1")
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos un director existente");
    console.log(videosystem.removeDirector(director3));
} catch (error) {
    console.log(error.message);
}

try {
    console.log("");
    console.log("Eliminamos un director que no existe");
    console.log(videosystem.removeDirector(director3));
} catch (error) {
    console.log(error.message);
}

console.log("");
showDirectors();

console.log("------------------------------------------------------------");
console.log("");

// Assignments
console.log("Asignamos a la categoría 1 las producciones anteriores, si no existe se crean");
console.log(videosystem.assignCategory(cat1, movie1, serie1, movie2));
console.log("Desasignamos a la categoría 1 una producción");
console.log(videosystem.deassignCategory(cat1, movie2));

console.log("------------------------------------------------------------");
console.log("");
console.log("Asignamos al director 1 las producciones anteriores, si no existe se crean");
console.log(videosystem.assignDirector(director1, movie1, serie1, movie2));
console.log("Asignamos al director 2 las producciones anteriores");
console.log(videosystem.assignDirector(director2, movie1, serie1));
console.log("Desasignamos al director 1 una producción");
console.log(videosystem.deassignDirector(director1, movie2));

console.log("------------------------------------------------------------");
console.log("");

console.log("Asignamos al actor 1 las producciones anteriores, si no existe se crean");
console.log(videosystem.assignActor(actor1, movie1, serie1, movie2));
console.log("Asignamos al actor 2 las producciones anteriores");
console.log(videosystem.assignActor(actor2, movie1, serie1));
console.log("Desasignamos al actor 1 una producción");
console.log(videosystem.deassignActor(actor1, movie2));

console.log("------------------------------------------------------------");
console.log("");


console.log("Obtenemos el cast de una película");
showCast(movie1);

console.log("Obtenemos las producciones de un director");
showDirectorsProduction(director1);

console.log("Obtenemos las producciones de un actor");
showActorsProduction(actor1);

console.log("Obtenemos las producciones de una categoría");
showCategoriesProduction(cat1);

// Functions

function showCategories() {
    console.log("Recorremos las categorías");
    console.log("--------------------------------");
    for (let categories of videosystem.categories) {
        console.log("Categories: " + categories.name);
    }
    console.log("");
}

function showUsers() {
    console.log("Recorremos los usuarios");
    console.log("--------------------------------");
    for (let users of videosystem.users) {
        console.log("Usuarios: " + users.username);
    }
    console.log("");
}

function showProductions() {
    console.log("Recorremos las producciones");
    console.log("--------------------------------");
    for (let production of videosystem.productions) {
        console.log("Producción: " + production.title);
    }
    console.log("");
}

function showActors() {
    console.log("Recorremos los actores");
    console.log("--------------------------------");
    for (let actor of videosystem.actors) {
        console.log("Actor: " + actor.name + ' ' + actor.lastname1);
    }
    console.log("");
}

function showDirectors() {
    console.log("Recorremos los directores");
    console.log("--------------------------------");
    for (let director of videosystem.directors) {
        console.log("Director: " + director.name + ' ' + director.lastname1);
    }
    console.log("");
}

function showCast(production) {
    if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
    console.log("Actores de la producción: " + production.title);
    console.log("--------------------------------");

    for (let element of videosystem.getCast(production)) {
        console.log(`${element.actor.name} ${element.actor.lastname1}`);
    }

    console.log("");
}


function showDirectorsProduction(person) {
    if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

    console.log("Producciones del director: " + person.name + ' ' + person.lastname1);
    console.log("--------------------------------");

    for (let element of videosystem.getProductionsDirector(person)) {
        console.log(element);
    }

    console.log("");
}

function showActorsProduction(person) {
    if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

    console.log("Producciones del actor: " + person.name + ' ' + person.lastname1);
    console.log("--------------------------------");
    for (let element of videosystem.getProductionsActor(person)) {
        console.log(element);
    }


    console.log("");
}

function showCategoriesProduction(category) {
    if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

    console.log("Producciones de la categoría: " + category.name);
    console.log("--------------------------------");
    
    for (let element of videosystem.getProductionsCategory(category)) {
        console.log(element);
    }

    console.log("");
}