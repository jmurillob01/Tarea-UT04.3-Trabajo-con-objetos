"use strict"; 

// Object to identify the data of a person
class Person{

    // Properties
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2, born, picture){

        // Control con excepciones
        // name es obligatorio
        // lastname1 es obligatorio
        // lastname2 es opcional
        // born es obligatorio
        // picture es opcional

        // Set the property values
        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }
}