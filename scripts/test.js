"use strict";

import Category from "./Category.js";
import Person from "./Person.js";
import Resource from "./Resource.js";
import Production from "./Production.js";
import Movie from "./Movie.js";
import VideoSystem from "./VideoSystem.js";

// // Complete test about person
// try {
//     // Creating the object
//     var person1 = new Person("Javier", "Murillo","","28/02/2002", "");
//     console.log(person1.toString());

//     // Error with Second Lastname
//     person1.lastname2 = "123";
// } catch (error) {
//     console.log(error.message); 
// }

// try {
//     // Error with Picture
//     person1.picture = "123";
// } catch (error) {
//     console.log(error.message); 
// }

// // Complete test about Category
// try {
//     var category1 = new Category("Fantasy", "person");
//     console.log(category1);

//     // Error with description
//     category1.description = "";
// } catch (error) {
//     console.log(error.message)
// }

// // Complete test about Resource
// try {
//     var resource1 = new Resource(10, "https://www.google.com");
//     console.log(resource1);

//     // Invalid resource
//     var resource2 = new Resource(0, "");
// } catch (error) {
//     console.log(error.message);
// }

// // Complete test about Production
// try {
//     var product1 = new Production("Titulo", "","28/02/2002","","");
// } catch (error) {
//     console.log(error.message);
// }

// // Test about Movie
// try {
//     var movie1 = new Movie("Pirulo", "","28/02/2002","","",resource1);
//     console.log(movie1);
// } catch (error) {
//     console.log(error.message);
// }

// Inicio de testeo de VideoSystem
let videosystem = VideoSystem.getInstance("Netflix");

let cat1 = videosystem.getCategory("Fantasy");
let cat2 = videosystem.getCategory("Comedy");
let cat3 = videosystem.getCategory("Horror");

videosystem.addCategory(cat1);
videosystem.addCategory(cat2);
videosystem.addCategory(cat3);

try {
    videosystem.removeCategory(cat1);
} catch (error) {
    console.log(error.message);
}

let user1 = videosystem.getUser("Javier", "javiermb@gmail.com", "Abcd1234");
let user2 = videosystem.getUser("Carlos", "carlosmb@gmail.com", "Abcd1234");
let user3 = videosystem.getUser("David", "davidlm@gmail.com", "Abcd1234");


videosystem.addUser(user1);
videosystem.addUser(user2);
videosystem.addUser(user3);


try {
    videosystem.removeUser(user1);   
} catch (error) {
    console.log(error.message);
}

var movie1 = videosystem.getMovie("Pirulo", "","28/02/2002","","");
var serie1 = videosystem.getSerie("Pirulo La Serie", "","28/02/2002","","");

videosystem.addProduction(movie1);
videosystem.addProduction(serie1);


try {
    videosystem.removeProduction(movie1);   
} catch (error) {
    console.log(error.message);
}

var actor1 = videosystem.getActor("Fernando", "Tejero","","12345678A","24/02/1967");
var actor2 = videosystem.getActor("Fermin", "Trujillo","","12345679A","26/02/1967");

videosystem.addActor(actor1);
videosystem.addActor(actor2);

try {
    videosystem.removeActor(actor2);  
} catch (error) {
    console.log(error.message);
}

var director1 = videosystem.getDirector("Fernando", "Tejero","","12345678A","24/02/1967");
var director2 = videosystem.getDirector("Fermin", "Trujillo","","12345679A","26/02/1967");

videosystem.addDirector(director1);
videosystem.addDirector(director2);

// ! Se puede añadir un director como actor y al revés

try {
    videosystem.removeDirector(director2);  
} catch (error) {
    console.log(error.message);
}

let cat4 = videosystem.getCategory("Suspense");
videosystem.assignCategory(cat4,movie1,serie1);
videosystem.deassignCategory(cat4, movie1);


videosystem.assignDirector(director1, movie1, serie1);
videosystem.deassignDirector(director1, movie1);

videosystem.assignActor(actor1, movie1, serie1);
videosystem.deassignActor(actor1, movie1);


console.log(videosystem);


// Funciones
showCategories();
showUsers();
showProductions();
showActors();
showDirectors();

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
        console.log("Actor: " + actor.name);
    }
    console.log("");
}

function showDirectors() {
    console.log("Recorremos los directores");
    console.log("--------------------------------");
    for (let director of videosystem.directors) {
        console.log("Director: " + director.name);
    }
    console.log("");
}