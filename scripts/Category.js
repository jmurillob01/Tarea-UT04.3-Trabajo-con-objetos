"use strict";

import { InvalidNameException,InvalidDescriptionException } from "./Exception.js";

const REGEX_NAME = /^[ a-zA-Záéíóú]+/; // Pattern for name

// Object to identify categories
class Category{
    // Properties
    #name;
    #description;

    // Constructor
    constructor(name, description = "") {
        
        if (!REGEX_NAME.test(name) || name.trim() == "") throw new InvalidNameException(name);

        this.#name = name;
        this.#description = description;
    }

    get name(){ // Getter name
        return this.#name;
    }

    get description(){ // Getter description
        return this.#description;
    }

    set description(description){ // Setter description
        if (!isNaN(description) || description.trim() == "") throw new InvalidDescriptionException(description);
        this.#description = description;
    }
}

export default Category;