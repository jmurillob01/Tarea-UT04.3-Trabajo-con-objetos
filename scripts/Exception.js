"use strict";

//Excepción base para ir creando el resto de excepciones.
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

// Excepción personalizada para indicar nombre incorrecto
class InvalidNameException extends BaseException{
    constructor(param, fileName, lineNumber) {
        super("Error: The name " + param + " can't be empty or numerical.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

// Excepción personalizada para indicar nombre incorrecto
class InvalidLastNameException extends BaseException{
    constructor(param, fileName, lineNumber) {
        super("Error: The lastname " + param + " can't be empty or numerical.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

// Excepción personalizada para indicar nombre incorrecto
class InvalidBirthException extends BaseException{
    constructor(param, fileName, lineNumber) {
        super("Error: The birth " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

// Excepción personalizada para indicar nombre incorrecto
class InvalidPictureException extends BaseException{
    constructor(param, fileName, lineNumber) {
        super("Error: The picture " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

export {BaseException, InvalidNameException,InvalidLastNameException,InvalidBirthException, InvalidPictureException}