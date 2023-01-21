"use strict";

import {
    InvalidVideoSystemException, CategoryVideoSystemException, CategoryExistsVideoSystemException,
    CategoryNonExistsVideoSystemException, DefaultCategoryVideoSystemException, UserVideoSystemException,
    UserExistsVideoSystemException, UserNonExistsVideoSystemException, ProductionVideoSystemException,
    ProductionExistsVideoSystemException, ProductionNonExistsVideoSystemException, PersonVideoSystemException,
    PersonExistsVideoSystemException, PersonNonExistsVideoSystemException, ProductionAssignExistsVideoSystemException
} from "./Exception.js";
import Category from "./Category.js";
import User from "./User.js";
import Production from "./Production.js";
import Movie from "./Movie.js";
import Serie from "./Serie.js";
import Person from "./Person.js";
// import Resource from "./Resource.js";
// import Coordinate from "./Coordinate.js";


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

                function compareElementsemail(element) {
                    return (element.email === user.email)
                }

                // search by username
                let find = this.#users.findIndex(compareElementsUsername);

                if (find == -1) {
                    // search by email
                    return (this.#users.findIndex(compareElementsemail))
                }

                return find;
            }

            #getProductionPosition(production) {
                function compareElements(element) {
                    return (element.title === production.title)
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

            constructor(name = "") {
                if (!isNaN(name) && name.trim() != "") throw new InvalidVideoSystemException("Name");


                this.#name = name;
                this.addCategory(this.#defaultCategory);
            }

            // Getter from name
            get name() {
                return this.#name;
            }

            // Setter name
            set name(name) {
                if (!isNaN(name) || name.trim() == "") throw new InvalidVideoSystemException("Name");
                this.#name = name;
            }

            // Iterator from categories
            get categories() {
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

            // Iterator from users
            get users() {
                let array = this.#users;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                        }
                    }
                }
            }

            // Iterator from productions
            get productions() {
                let array = this.#productions;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                        }
                    }
                }
            }

            // Iterator from actors
            get actors() {
                let array = this.#actors;
                return {
                    *[Symbol.iterator]() {
                        // We go through all the actors
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].actor;
                        }
                    }
                }
            }

            // Iterator from directors
            get directors() {
                let array = this.#directors;
                return {
                    *[Symbol.iterator]() {
                        // We go through all the directors
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].director;
                        }
                    }
                }
            }
            // Factory for categories
            getCategory(title = "Anon") {
                // We obtain the position of the category in the array
                let position = this.#categories.findIndex((cat) => cat.category.name === name);
                let category;
                if (position === -1) { // The category is not registered yet
                    category = new Category(title); // We create category object because it doesn't exist yet.
                } else { // The category is registered
                    category = this.#categories[position].category; // We recover the category of the array
                }
                return category;
            }

            // Add new Category to the system
            addCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                // We obtain the position of the category in the array
                let position = this.#getCategoryPosition(category);
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

                return this.#categories.length;
            }

            // TODO: Hay que testearla cuando tenga producciones asignadas a la categoría
            removeCategory(category) {
                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                // We obtain the position of the category in the array
                let position = this.#getCategoryPosition(category);

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

                return this.#categories.length;
            }

            // Factory for users
            getUser(username = "", email = "", password) {
                // We obtain the position of the user in the array
                let position_username = this.#users.findIndex((systemUser) => systemUser.username === username);
                let position_email = this.#users.findIndex((systemUser) => systemUser.email === email);
                let user;
                if (position_username === -1 && position_email === -1) { // The user is not registered yet
                    user = new User(username, email, password); // We create user object because it doesn't exist yet.
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

                // We obtain the position of the category in the array
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

                // We obtain the position of the user in the array
                let position = this.#getUserPosition(user);

                if (position != -1) {
                    // Remove the user
                    this.#users.splice(position, 1);
                }
                else {
                    throw new UserNonExistsVideoSystemException();
                }
                return this.#users.length;
            }

            // Factory for Movie
            getMovie(title, nationality, publication, synopsis, image, resource, locations) {
                // We obtain the position of the production in the array
                let position = this.#productions.findIndex((production) => production.title === title);
                let movie;
                if (position === -1) { // The production is not registered yet
                    movie = new Movie(title, nationality, publication, synopsis, image, resource, locations); // We create production object because it doesn't exist yet.
                } else { // The user is registered
                    movie = this.#productions[position]; // We recover the production of the array
                }
                return movie;
            }

            // Factory for Serie
            getSerie(title, nationality, publication, synopsis, image, resource, locations, seasons) {
                // We obtain the position of the production in the array
                let position = this.#productions.findIndex((production) => production.title === title);
                let serie;
                if (position === -1) { // The production is not registered yet
                    serie = new Serie(title, nationality, publication, synopsis, image, resource, locations, seasons); // We create production object because it doesn't exist yet.
                } else { // The user is registered
                    serie = this.#productions[position]; // We recover the production of the array
                }
                return serie;
            }

            // Add new Production to the system
            addProduction(production) {
                if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                // We obtain the position of the production in the array
                let position = this.#getProductionPosition(production);
                if (position === -1) {
                    this.#productions.push(production);
                } else {
                    throw new ProductionExistsVideoSystemException();
                }

                return this.#productions.length;
            }

            // Remove a production from the system
            removeProduction(production) {
                if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();

                // We obtain the position of the user in the array
                let position = this.#getProductionPosition(production);

                if (position != -1) {
                    // Remove the production
                    this.#productions.splice(position, 1);
                } else {
                    throw new ProductionNonExistsVideoSystemException();
                }
                return this.#productions.length;
            }

            // Factory for Actor
            getActor(name, lastname1, lastname2, dni, born, picture) {
                // We obtain the position of the actor in the array
                let position_dni = this.#actors.findIndex((actor) => actor.dni === dni);
                let person;
                if (position_dni === -1) { // The person is not registered yet
                    person = new Person(name, lastname1, lastname2, dni, born, picture); // We create person object because it doesn't exist yet.
                } else { // The person is registered
                    person = this.#actors[position_dni]; // We recover the person of the array
                }
                return person;
            }

            // Add new Actor to the system
            addActor(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                // We obtain the position of the Actor in the array
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

                // We obtain the position of the person in the array
                let position = this.#getActorPosition(person);

                if (position != -1) {
                    // Remove the production
                    this.#actors.splice(position, 1);
                } else {
                    throw new PersonNonExistsVideoSystemException();
                }
                return this.#actors.length;
            }

            // Factory for Director
            getDirector(name, lastname1, lastname2, dni, born, picture) {
                // We obtain the position of the director in the array
                let position_dni = this.#directors.findIndex((director) => director.dni === dni);
                let person;
                if (position_dni === -1) { // The person is not registered yet
                    person = new Person(name, lastname1, lastname2, dni, born, picture); // We create person object because it doesn't exist yet.
                } else { // The person is registered
                    person = this.#directors[position_dni]; // We recover the person of the array
                }
                return person;
            }

            // Add new Director to the system
            addDirector(person) {
                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                // We obtain the position of the director in the array
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

                // We obtain the position of the person in the array
                let position = this.#getDirectorPosition(person);

                if (position != -1) {
                    // Remove the production
                    this.#directors.splice(position, 1);
                } else {
                    throw new PersonNonExistsVideoSystemException();
                }
                return this.#directors.length;
            }

            assignCategory(category, ...productions) {

                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category);

                if (position === -1) {
                    this.addCategory(category); // Añadimos la categoría si no existe
                    position = this.#categories.length - 1;
                }

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se agregan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) { // Si la producción no existe se agrega
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#categories[position].productions.indexOf(title) !== -1) { // Si la producción ya está asignada a la categoría se lanza excepción
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#categories[position].productions.push(title); // Asignamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#categories[position].productions.length;
            }

            deassignCategory(category, ...productions) {

                if (!(category instanceof Category) || category == null) throw new CategoryVideoSystemException();

                let position = this.#getCategoryPosition(category);

                if (position === -1) throw new CategoryNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se eliminan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        let title = this.#productions[positionProd].title;

                        this.#categories[position].productions.splice(title, 1); // Eliminamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#categories[position].productions.length;
            }

            assignDirector(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position === -1) {
                    this.addDirector(person); // Añadimos el director si no existe
                    position = this.#directors.length - 1;
                }

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se agregan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) { // Si la producción no existe se agrega
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#directors[position].productions.indexOf(title) !== -1) { // Si la producción ya está asignada al director se lanza excepción
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#directors[position].productions.push(title); // Asignamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#directors[position].productions.length;
            }

            deassignDirector(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getDirectorPosition(person);

                if (position === -1) throw new PersonNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se eliminan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        let title = this.#productions[positionProd].title;

                        this.#directors[position].productions.splice(title, 1); // Eliminamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#directors[position].productions.length;
            }

            assignActor(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);

                if (position === -1) {
                    this.addActor(person); // Añadimos el actor si no existe
                    position = this.#actors.length - 1;
                }

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se agregan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) { // Si la producción no existe se agrega
                            this.addProduction(production);
                            positionProd = this.#productions.length - 1;
                        }

                        let title = this.#productions[positionProd].title;
                        if (this.#actors[position].productions.indexOf(title) !== -1) { // Si la producción ya está asignada al director se lanza excepción
                            throw new ProductionAssignExistsVideoSystemException(title);
                        }

                        this.#actors[position].productions.push(title); // Asignamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#actors[position].productions.length;
            }

            deassignActor(person, ...productions) {

                if (!(person instanceof Person) || person == null) throw new PersonVideoSystemException();

                let position = this.#getActorPosition(person);

                if (position === -1) throw new PersonNonExistsVideoSystemException();

                for (let production of productions) {
                    try { // Evitamos las producciones incorrectas y se eliminan las correctas
                        if (!(production instanceof Production) || production == null) throw new ProductionVideoSystemException();
                        let positionProd = this.#getProductionPosition(production);

                        if (positionProd === -1) throw new ProductionNonExistsVideoSystemException();

                        let title = this.#productions[positionProd].title;

                        this.#actors[position].productions.splice(title, 1); // Eliminamos la producción
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                return this.#actors[position].productions.length;
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