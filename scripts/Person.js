"use strict";

import {
    BaseException, InvalidPersonException,InvalidPersonDNIException
} from "./Exception.js";

const REGEX_NAME_LASTNAME = /^[ a-zA-Záéíóú]+/; // Pattern for name
const REGEX_BORN = /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])(\/)(\d{4})$/;// Pattern for born
const REGEX_IMG = /.*(png|jpg|jpeg|gif)$/;
const REGEX_DNI = /^[0-9]{8}[A-Za-z]{1}$/;

class Person {

    // Function to create a date
    #createDate(born) {
        // As we have developed the program, the third position (2) will be the delimiter
        let separator = born[2];
        let arrayDate = born.split(separator, 3);
        return new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    }

    // Function to create a date string
    #toStringDate(date = "") {

        if (date == "") { // If we don't get the date, it means you worked with the object property
            date = this.#born;
        }

        let month = date.getMonth() + 1; // We take the indicated month (one is added because to create the date we have subtracted one, since January is not 01 but 00)
        let str = "";

        (date.getDate() < 10) ? (str += '0' + date.getDate() + "/") : (str += date.getDate() + "/");// If the day is less than 10, we add 0

        // Add the month
        if (month < 10) {
            str += '0' + month + "/"
        } else {
            str += month + "/";
        }

        str += date.getFullYear();// Add the year

        return str;
    }

    // Properties
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;
    #dni;

    constructor(name, lastname1, lastname2 = "",dni, born, picture = "") {

        // Name check
        if (!REGEX_NAME_LASTNAME.test(name) || name.trim() == "") throw new InvalidPersonException("name");
        // Lastname1 check
        if (!REGEX_NAME_LASTNAME.test(lastname1) || lastname1.trim() == "") throw new InvalidPersonException("lastname1");
        // Lastname2 check
        if (!REGEX_NAME_LASTNAME.test(lastname2) && lastname2 != "") throw new InvalidPersonException("lastname2");
        // Born check
        if (!REGEX_BORN.test(born)) throw new InvalidPersonException("born");
        // We check that the date is not modified when it is created with incorrect data
        if (born != this.#toStringDate(this.#createDate(born))) throw new InvalidPersonException("born");
        // Picture check
        if (!REGEX_IMG.test(picture) && picture.trim() != "") throw new InvalidPersonException("picture");
        //DNI check
        if (!REGEX_DNI.test(dni)) throw new InvalidPersonException("dni");

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = this.#createDate(born);
        this.#picture = picture;
        this.#dni = dni;
    }

    get name() { // Getter name
        return this.#name;
    }

    get lastname1() { // Getter lastName1
        return this.#lastname1;
    }

    get lastname2() { // Getter lastName2
        return this.#lastname2;
    }

    set lastname2(lastname2) { // Setter lastName2
        if (!REGEX_NAME_LASTNAME.test(lastname2) || lastname2.trim() == "") throw new InvalidPersonException("lastname2");
        this.#lastname2 = lastname2;
    }

    get born() { // Getter born
        return this.#toStringDate();
    }

    get picture() { // Getter picture
        return this.#picture;
    }

    set picture(picture) { // Setter picture
        if (!REGEX_IMG.test(picture) && picture.trim() != "") throw new InvalidPersonException("picture");
        this.#picture = picture;
    }

    get dni() { // Getter dni
        return this.#dni;
    }

    // toString method
    toString() {
        return `Name: ${this.name}, First Lastname: ${this.lastname1}, Second Lastname: ${this.lastname2}, Birth: ${this.#toStringDate()}`;
    }
}

export default Person;