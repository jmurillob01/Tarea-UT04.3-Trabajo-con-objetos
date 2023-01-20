"use strict";

import { InvalidUserInstanceException } from "./Exception.js";

const REGEX_USERNAME = /^([a-zA-Z0-9_]){4,16}$/;
const REGEX_EMAIL =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const REGEX_PASSWORD = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

class User {
    #username;
    #email;
    #password;

    constructor(username = "", email = "", password = "") {
        // Username check
        if (!REGEX_USERNAME.test(username)) throw new InvalidUserInstanceException("username");
        // email check
        if (!REGEX_EMAIL.test(email)) throw new InvalidUserInstanceException("email");
        // password check
        if (!REGEX_PASSWORD.test(password)) throw new InvalidUserInstanceException("password");

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    get username(){
        return this.#username;
    }

    get email(){
        return this.#email;
    }

    // * Since they are required values, we don't need set
}

export default User;