"use strict";

// Pattern for birth
const REGEX_BIRTH = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)(\d{4})$/;

// Object to identify the data of a person
class Person {

    // Function to create a date
    #createDate(birth) {

        // As we have developed the program, the third position (2) will be the delimiter
        let separator = birth[2];
        let arrayDate = birth.split(separator, 3);
        return new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    }

    // Function to create a date string
    #toStringDate() {
        let month = this.#birth.getMonth() + 1; // We take the indicated month (one is added because to create the date we have subtracted one, since January is not 01 but 00)
        let str = "";

        (this.#birth.getDate() < 10) ? (str += '0' + this.#birth.getDate() + " - ") : (str += this.#birth.getDate() + " - ");// If the day is less than 10, we add 0

        // Add the month
        if (month < 10) {
            str += '0' + month + " - "
        } else {
            str += month + " - ";
        }

        str += this.#birth.getFullYear();// Add the year

        return str;
    }


    // Properties
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2, born, picture) {

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
        this.#born = this.#createDate;
        this.#picture = picture;
    }
}