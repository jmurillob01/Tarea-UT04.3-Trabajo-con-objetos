"use strict";

import {
    InvalidVideoSystemException, CategoryVideoSystemException, CategoryExistsVideoSystemException,
    CategoryNonExistsVideoSystemException, DefaultCategoryVideoSystemException, UserVideoSystemException,
    UserExistsVideoSystemException, UserNonExistsVideoSystemException, ProductionVideoSystemException,
    ProductionExistsVideoSystemException, ProductionNonExistsVideoSystemException, PersonVideoSystemException,
    PersonExistsVideoSystemException, PersonNonExistsVideoSystemException, ProductionAssignExistsVideoSystemException
} from "../Exception.js";
import Category from "../Category.js";
import User from "../User.js";
import Production from "../Production.js";
import Movie from "../Movie.js";
import Serie from "../Serie.js";
import Person from "../Person.js";



let VideoSystem = (function () {
    let instantiated;

    function init(name) { // Singleton initialization

        class VideoSystem {
            #name; // Name of the system
            #users = []; // Users from the system
            #productions = []; // Productions from the system
            #categories = []; // Categories from the system
            #actors = []; // Actors from the system
            #directors = []; // Directors from the system

            /**
                Structure to store objects
                #directors[
                    {
                        director: person,
                        productions: [productions] // Array containing productions reference
                    }
                ]
                #actors[
                    {
                        actor: person,
                        productions: [productions] // Array containing productions reference
                    }
                ]:
                #categories[
                    { 
                        category: category,
                        productions: [productions] // Array containing productions reference
                    }
                ]
                #productions: [] // Array containing system productions
                #users: [] // Array containing system users
                #name: // String containing name from the system
             */

            #defaultCategory = new Category("Anonymous category"); // Default Category

            #getCategoryPosition(category) {
                function compareElements(element) {
                    return (element.category.name === category.name)
                }

                return this.#categories.findIndex(compareElements);
            }

            #getUserPosition(user) {
                function compareElementsUsername(element) {
                    return (element.username === user.username)
                }
                function compareElementsEmail(element) {
                    return (element.email === user.email)
                }

                let find = this.#users.findIndex(compareElementsUsername); // search by username

                if (find == -1) return (this.#users.findIndex(compareElementsEmail)); // search by email

                return find;
            }

            #getProductionPosition(production) {
                function compareElements(element) {
                    return (element.title === production.title)
                }

                return this.#productions.findIndex(compareElements);
            }

            #getProductionPositionByTitle(title) { // Es - Núevo método para obtener la posición de una producción buscada por título
                function compareElements(element) {
                    return (element.title === title)
                }

                return this.#productions.findIndex(compareElements);
            }

            #getActorPosition(person) {
                function compareActorDni(element) {
                    return (element.actor.dni === person.dni)
                }

                return this.#actors.findIndex(compareActorDni);
            }

            #getDirectorPosition(person) {
                function compareDirectorDni(element) {
                    return (element.director.dni === person.dni)
                }

                return this.#directors.findIndex(compareDirectorDni);
            }

            constructor(name = "") { // Constructor
                if (!isNaN(name) && name.trim() != "") throw new InvalidVideoSystemException("Name");

                this.#name = name;
                this.addCategory(this.#defaultCategory);
            }

            get name() { // Getter from name
                return this.#name;
            }

            set name(name) { // Setter name
                if (!isNaN(name) || name.trim() == "") throw new InvalidVideoSystemException("Name");
                this.#name = name;
            }

            get categories() { // Iterator from categories
                let array = this.#categories;
                return {
                    *[Symbol.iterator]() {
                        // We go through all the categories except the default one.
                        for (let i = 1; i < array.length; i++) {
                            yield array[i].category;
                        }
                    }
                }
            }

            get users() { // Iterator from users
                let array = this.#users;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                        }
                    }
                }
            }

            get productions() { // Iterator from productions
                let array = this.#productions;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                        }
                    }
                }
            }

            getProductionNumber() { // Method to obtain the number of productions
                let productions = this.productions;
                let count = 0;

                for (const production of productions) {
                    count++;
                }
                return count;

            }

            get actors() { // Iterator from actors
                let array = this.#actors;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].actor;
                        }
                    }
                }
            }

            get directors() { // Iterator from directors
                let array = this.#directors;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].director;
                        }
                    }
                }
            }

            // Factory for categories
            getCategory(title = "Anon") {
                let position = this.#categories.findIndex((cat) => cat.category.name === name); // We obtain the position of the category in the array
                let category;

                if (position === -1) { // The category is not registered yet
                    category = new Category(title); // We create category
                } else { // The category is registered
                    category = this.#categories[position].category; // We recover the category of the array
                }
                return category;
            }

            // Add new Category to the system
            addCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category); // We obtain the position of the category in the array

                if (position === -1) {
                    // Add object literal with a property for the category and an array for the productions within the category
                    this.#categories.push(
                        {
                            category: category,
                            productions: []
                        }
                    );
                } else {
                    throw new CategoryExistsVideoSystemException();
                }
                return this.#categories.length - 1; // We don't count the first
            }

            removeCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category); // We obtain the position of the category in the array

                if (position != -1) {
                    // Control that the default category is not deleted
                    if (category.name != this.#defaultCategory.name) {
                        // Pass all the productions to the default category
                        for (let production of this.#categories[position].productions) {
                            this.#categories[0].productions.push(production);
                        }
                        // Remove the category
                        this.#categories.splice(position, 1);
                    } else {
                        throw new DefaultCategoryVideoSystemException();
                    }
                } else {
                    throw new CategoryNonExistsVideoSystemException();
                }
                return this.#categories.length - 1; // We don't count the first
            }

            // Factory for users
            getUser(username = "", email = "", password) {
                let position_username = this.#users.findIndex((systemUser) => systemUser.username === username);
                let position_email = this.#users.findIndex((systemUser) => systemUser.email === email);
                let user;

                if (position_username === -1 && position_email === -1) { // The user is not registered yet
                    user = new User(username, email, password);
                } else { // The user is registered
                    if (position_username === -1) {
                        user = this.#users[position_username]; // We recover the user of the array with the same username
                    } else {
                        user = this.#users[position_email]; // We recover the user of the array with the same email
                    }
                }
                return user;
            }

            // Add new User to the system
            addUser(user) {
                if (!(user instanceof User) || user == null) throw new UserVideoSystemException();

                let position = this.#getUserPosition(user);

                if (position === -1) {
                    this.#users.push(user);
                } else {
                    throw new UserExistsVideoSystemException();
                }
                return this.#users.length;
            }

            // Remove a user from the system
            removeUser(user) {
                if (!(user instanceof User) || user == null) throw new UserVideoSystemException();

                let position = this.#getUserPosition(user);

                if (position != -1) {
                    this.#users.splice(position, 1); // Remove the user
                }
                else {
                    throw new UserNonExistsVideoSystemException();
                }
                return this.#users.length;
            }

            // Factory for Movie
            getMovie(title, nationality, publication, synopsis, image, resource, locations) {
                let position = this.#productions.findIndex((production) => production.title === title);
                let movie;

                if (position === -1) { // The production is not registered yet
                    movie = new Movie(title, nationality, publication, synopsis, image, resource, locations);
                } else { // The production is registered
                    movie = this.#productions[position];
                }
                return movie;
            }

            // Factory for Serie
            getSerie(title, nationality, publication, synopsis, image, resource, locations, seasons) {
                let position = this.#productions.findIndex((production) => production.title === title);
                let serie;

                if (position === -1) { // The production is not registered yet
                    serie = new Serie(title, nationality, publication, synopsis, image, resource, locations, seasons);
                } else { // The production is registered
                    serie = this.#productions[position];
                }
                return serie;
            }

            // Add new Production to the system
            // addProduction(production) {
            //     if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

            //     let position = this.#getProductionPosition(production);

            //     if (position === -1) { // The production is not registered yet
            //         this.#productions.push(production);
            //     } else { // The production is registered
            //         throw new ProductionExistsVideoSystemException();
            //     }
            //     return this.#productions.length;
            // }
            addProduction(...productions) {
                for (let production of productions) {
                    try { // We avoid incorrect productions and add the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                        let position = this.#getProductionPosition(production);

                        if (position === -1) { // The production is not registered yet
                            this.#productions.push(production);
                        } else { // The production is registered
                            throw new ProductionExistsVideoSystemException();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                return this.#productions.length;
            }

            // Remove a production from the system
            removeProduction(production) {
                if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                let position = this.#getProductionPosition(production);

                if (position != -1) {
                    this.#productions.splice(position, 1); // Remove the production

                    // delete production from categories
                    this.#categories.forEach(category => {
                        category.productions.forEach(productionC => {
                            if (productionC === production.title) {
                                let positionP = category.productions.indexOf(production.title)
                                category.productions.splice(positionP, 1);
                            }
                        });
                    });

                    // delete production from actors
                    this.#actors.forEach(actor => {
                        actor.productions.forEach(productionA => {
                            if (productionA === production.title) {
                                let positionP = actor.productions.indexOf(production.title)
                                actor.productions.splice(positionP, 1);
                            }
                        });
                    });

                    // delete production from directors
                    this.#directors.forEach(director => {
                        director.productions.forEach(productionD => {
                            if (productionD === production.title) {
                                let positionP = director.productions.indexOf(production.title)
                                director.productions.splice(positionP, 1);
                            }
                        });
                    });
                } else {
                    throw new ProductionNonExistsVideoSystemException();
                }
                return this.#productions.length;
            }

            // Factory for Actor
            getActor(name, lastname1, lastname2, dni, born, picture) {
                let position_dni = this.#actors.findIndex((actor) => actor.dni === dni);
                let person;

                if (position_dni === -1) { // The person is not registered yet
                    person = new Person(name, lastname1, lastname2, dni, born, picture);
                } else { // The person is registered
                    person = this.#actors[position_dni];
                }
                return person;
            }

            // Add new Actor to the system
            addActor(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);
                if (position === -1) {
                    // Add object literal with a property for the Actor and an array for the productions within the Actor
                    this.#actors.push(
                        {
                            actor: person,
                            productions: []
                        }
                    );
                } else {
                    throw new PersonExistsVideoSystemException();
                }
                return this.#actors.length;
            }

            // Remove an actor from the system
            removeActor(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);

                if (position != -1) {
                    this.#actors.splice(position, 1); // Remove the production
                } else {
                    throw new PersonNonExistsVideoSystemException();
                }
                return this.#actors.length;
            }

            // Factory for Director
            getDirector(name, lastname1, lastname2, dni, born, picture) {
                let position_dni = this.#directors.findIndex((director) => director.dni === dni);
                let person;

                if (position_dni === -1) { // The person is not registered yet
                    person = new Person(name, lastname1, lastname2, dni, born, picture);
                } else { // The person is registered
                    person = this.#directors[position_dni];
                }
                return person;
            }

            // Add new Director to the system
            addDirector(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position === -1) {
                    // Add object literal with a property for the director and an array for the productions within the director
                    this.#directors.push(
                        {
                            director: person,
                            productions: []
                        }
                    );
                } else {
                    throw new PersonExistsVideoSystemException();
                }

                return this.#directors.length;
            }

            // Remove an actor from the system
            removeDirector(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position != -1) {
                    this.#directors.splice(position, 1); // Remove the production
                } else {
                    throw new PersonNonExistsVideoSystemException();
                }
                return this.#directors.length;
            }

            // Assign productions to categories
            assignCategory(category, ...productions) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category);

                if (position === -1) {
                    this.addCategory(category); // Add the category if it does not exist
                    position = this.#categories.length - 1;
                }

                for (let production of productions) {
                    try { // We avoid incorrect productions and add the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) { // Add production if it does not exist
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#categories[position].productions.indexOf(title) !== -1) { // If the production is already assigned to the category, an exception is thrown
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#categories[position].productions.push(title); // Assign the production
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#categories[position].productions.length;
            }

            // Deassign productions to categories
            deassignCategory(category, ...productions) {

                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category);

                if (position === -1) throw new CategoryNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // We avoid incorrect productions and eliminate the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#categories[position].productions.indexOf(production.title);
                        // let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        // let title = this.#productions[positionProd].title;

                        this.#categories[position].productions.splice(positionProd, 1); // Eliminate production
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#categories[position].productions.length;
            }

            // Assign productions to Directors
            assignDirector(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position === -1) {
                    this.addDirector(person); // Add Director if it does not exist
                    position = this.#directors.length - 1;
                }

                for (let production of productions) {
                    try { // We avoid incorrect productions and add the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) { // Add production if it does not exist
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#directors[position].productions.indexOf(title) !== -1) { // If the production is already assigned to the category, an exception is thrown
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#directors[position].productions.push(title); // Assign the production
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#directors[position].productions.length;
            }

            // Deassign productions to Directors
            deassignDirector(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position === -1) throw new PersonNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // We avoid incorrect productions and eliminate the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#directors[position].productions.indexOf(production.title);
                        // let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        // let title = this.#productions[positionProd].title;

                        this.#directors[position].productions.splice(positionProd, 1); // Eliminate production
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#directors[position].productions.length;
            }

            // Assign productions to Actors
            assignActor(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);

                if (position === -1) {
                    this.addActor(person); // Add Actor if it does not exist
                    position = this.#actors.length - 1;
                }

                for (let production of productions) {
                    try { // We avoid incorrect productions and add the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) {
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#actors[position].productions.indexOf(title) !== -1) { // If the production is already assigned to the category, an exception is thrown
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#actors[position].productions.push(title);
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#actors[position].productions.length;
            }

            // Deassign productions to Actors
            deassignActor(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);

                if (position === -1) throw new PersonNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // We avoid incorrect productions and eliminate the correct ones
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        // ! Estoy pillando la posición del array de producciones general, no del actor
                        let positionProd = this.#actors[position].productions.indexOf(production.title);
                        // let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        // let title = this.#productions[positionProd].title;

                        this.#actors[position].productions.splice(positionProd, 1);
                        // this.#actors[position].productions.splice(title, 1);
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#actors[position].productions.length;
            }

            // Production is an object iterator
            getCast(production) {
                if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                let actorsArray = this.#actors;
                let actorsCast = new Array(); // Array to add the actors of the production

                for (let actor of actorsArray) {
                    // We go through the productions of each actor
                    for (let productionActor of actor.productions) {
                        // If the production matches the one received, we add it to the array
                        if (productionActor === production.title) {
                            actorsCast.push(actor);
                        }
                    }
                }
                return {
                    *[Symbol.iterator]() {
                        // We go through all the productions.
                        for (let i = 0; i < actorsCast.length; i++) {
                            yield actorsCast[i];
                        }
                    }
                };
            }

            // Gets an iterator with the productions of a director.
            getProductionsDirector(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let directorsProduction = new Array();

                for (let directorObject of this.#directors) {
                    if (directorObject.director.name === person.name) {
                        for (let production of directorObject.productions) {
                            directorsProduction.push(production);
                        }
                    }
                }
                return {
                    *[Symbol.iterator]() {
                        // We go through all the productions.
                        for (let i = 0; i < directorsProduction.length; i++) {
                            yield directorsProduction[i];
                        }
                    }
                };
            }

            // Gets an iterator with the productions of an Actor.
            getProductionsActor(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let actorsProduction = new Array();

                for (let actorObject of this.#actors) {
                    if (actorObject.actor.name === person.name) {
                        for (let production of actorObject.productions) {
                            actorsProduction.push(production);
                        }
                    }
                }
                return {
                    *[Symbol.iterator]() {
                        // We go through all the productions.
                        for (let i = 0; i < actorsProduction.length; i++) {
                            yield actorsProduction[i];
                        }
                    }
                };

            }

            // Gets an iterator with the productions of a certain category.
            getProductionsCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let categoryProduction = new Array();

                for (let categoryObject of this.#categories) {
                    if (categoryObject.category.name === category.name) {
                        for (let production of categoryObject.productions) {
                            categoryProduction.push(production);
                        }
                    }
                }
                return {
                    *[Symbol.iterator]() {
                        // We go through all the productions.
                        for (let i = 0; i < categoryProduction.length; i++) {
                            yield categoryProduction[i];
                        }
                    }
                };
            }

            // we obtain an iterator with the objects productions
            getProductionsObjectCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();
                let categoryProduction = new Array();
                let productionsTitle = new Array();

                for (let categoryObject of this.#categories) {
                    if (categoryObject.category.name === category.name) {
                        for (let production of categoryObject.productions) {
                            productionsTitle.push(production);
                        }
                    }
                }

                for (let production of this.#productions) {
                    if (productionsTitle.includes(production.title)) {
                        categoryProduction.push(production);
                    }
                }
                return {
                    *[Symbol.iterator]() {
                        // We go through all the productions.
                        for (let i = 0; i < categoryProduction.length; i++) {
                            yield categoryProduction[i];
                        }
                    }
                };

            }

            getProductionObject(title) {

                let position = this.#getProductionPositionByTitle(title);
                return this.#productions[position];
            }

        }

        let instance = new VideoSystem(name); // We return the VideoSystem object to be a single instance.
        Object.freeze(instance);
        return instance;
    } // End of singleton initialization
    return {
        // Return an object with the getInstance method
        getInstance: function (name) {
            if (!instantiated) { // If the instantiated variable is undefined, run init.
                instantiated = init(name); // Instantiated contains the single object
            }
            return instantiated; // If it is already assigned, it returns the assignment.
        }
    };
})();

export default VideoSystem;