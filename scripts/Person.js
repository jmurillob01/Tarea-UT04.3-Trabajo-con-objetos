"use strict";

import{
    BaseException, InvalidNameException, InvalidLastNameException, InvalidBirthException, InvalidPictureException
} from "./Exception.js";

const REGEX_NAME_LASTNAME = /^[ a-zA-Záéíóú]+/; // Pattern for name
const REGEX_BORN = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)(\d{4})$/;// Pattern for born
const REGEX_IMG = /.*(png|jpg|jpeg|gif)$/;

// Object to identify the data of a person
class Person {

    // Function to create a date
    #createDate(born) {
        // As we have developed the program, the third position (2) will be the delimiter
        let separator = born[2];
        let arrayDate = born.split(separator, 3);
        return new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    }

    // Function to create a date string
    #toStringDate() {
        let month = this.#born.getMonth() + 1; // We take the indicated month (one is added because to create the date we have subtracted one, since January is not 01 but 00)
        let str = "";

        (this.#born.getDate() < 10) ? (str += '0' + this.#born.getDate() + " - ") : (str += this.#born.getDate() + " - ");// If the day is less than 10, we add 0

        // Add the month
        if (month < 10) {
            str += '0' + month + " - "
        } else {
            str += month + " - ";
        }

        str += this.#born.getFullYear();// Add the year

        return str;
    }


    // Properties
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2="", born, picture="") {

        // Control con excepciones
        if (!REGEX_NAME_LASTNAME.test(name) || name.trim() == "") throw new InvalidNameException(name);
        // lastname1 es obligatorio
        if (!REGEX_NAME_LASTNAME.test(lastname1) || lastname1.trim() == "") throw new InvalidLastNameException(lastname1);
        // lastname2 es opcional
        if (!REGEX_NAME_LASTNAME.test(lastname2) && lastname2 != "") throw new InvalidLastNameException(lastname2);
        // born es obligatorio
        if (!REGEX_BORN.test(born)) throw new InvalidBirthException(born);
        // picture es opcional
        if (!REGEX_IMG.test(picture) && picture != "") throw new InvalidPictureException(picture);

        // Set the property values
        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = this.#createDate(born);
        this.#picture = picture;
    }

    get name(){ // Getter name
        return this.#name;
    }

    get lastname1(){ // Getter lastName1
        return this.#lastname1;
    }

    get lastname2(){ // Getter lastName2
        return this.#lastname2;
    }

    set lastname2(lastname2){ // Setter lastName2
        if (!REGEX_NAME_LASTNAME.test(lastname2) || lastname2.trim() == "") throw new InvalidLastNameException(lastname2);
        this.#lastname2 = lastname2;
    }

    get born(){ // Getter born
        return this.#toStringDate();
    }

    get picture(){ // Getter picture
        return this.#picture;
    }

    set picture(picture){ // Setter picture
        if (!REGEX_IMG.test(picture) || picture != "") throw new InvalidPictureException(picture);
        this.#picture = picture;
    }

    // toString method
    toString(){
        return `Name: ${this.name}, First Lastname: ${this.lastname1}, Second Lastname: ${this.lastname2}, Birth: ${this.#toStringDate()}`;
    }
}

export default Person;