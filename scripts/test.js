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

showCategories();

function showCategories(){
    console.log("Recorremos las categorías");
    for (let categories of videosystem.categories) {
        console.log("Categories: " + categories.name);
    }
}