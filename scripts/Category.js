"use strict";

import { InvalidCategoryException } from "./Exception.js";

const REGEX_NAME = /^[ a-zA-Záéíóú]+/;

class Category{
    #name;
    #description;

    constructor(name, description = "") {
        
        // Name check
        if (!REGEX_NAME.test(name) || name.trim() == "") throw new InvalidCategoryException("name");
        // Description check
        if (typeof description != "string") throw new InvalidCategoryException("description");

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
        if (!isNaN(description) || description.trim() == "" || typeof description != "string") throw new InvalidCategoryException("description");
        this.#description = description;
    }
}

export default Category;