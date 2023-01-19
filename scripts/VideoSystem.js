"use strict";

import { InvalidVideoSystemException, CategoryVideoSystemException, CategoryExistsVideoSystemException } from "./Exception.js";
import Category from "./Category.js";


let VideoSystem = (function () {
    let instantiated;

    function init(name) { // Singleton initialization

        class VideoSystem {
            #name; // Name of the system
            #users = []; // Users from the system
            #productions = []; // Productions from the system
            #categories = []; // Categories from the system
            #actors = []; // Actors from the system
            #director = []; // Directors from the system

            /**
                Structure to store objects
               
                #director[
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

            // Iterator
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

            // Factory for categories
            getCategory(title = "Anon") {
				// We obtain the position of the category in the array
				let position = this.#categories.findIndex((cat) => cat.category.name === name);
				let category;
				if (position === -1){ // The category is not registered yet
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