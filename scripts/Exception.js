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
class InvalidNameException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The name " + param + " can't be empty or numerical.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidNameException";
    }
}

// Excepción personalizada para indicar apellido incorrecto
class InvalidLastNameException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The lastname " + param + " can't be empty or numerical.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidLastNameException";
    }
}

// Excepción personalizada para indicar la fecha de nacimiento incorrecta
class InvalidBirthException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The birth " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidBirthException";
    }
}

// Excepción personalizada para indicar nombre de foto incorrecto
class InvalidPictureException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The picture " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidPictureException";
    }
}

// Excepción personalizada para indicar descripción incorrecta
class InvalidDescriptionException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The description " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidDescriptionException";
    }
}

// Excepción personalizada para indicar duración incorrecta
class InvalidDurationException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The duration " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidDurationException";
    }
}

// Excepción personalizada para indicar link incorrecto
class InvalidLinkException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The link " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidLinkException";
    }
}

// Excepción personalizada para indicar link incorrecto
class AbstractClassException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The class " + param + " is abstract.", fileName, lineNumber);
        this.param = param;
        this.name = "AbstractClassException";
    }
}

class InvalidProductionException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The property " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidProductionException";
    }
}
// TODO: Crear una excepción para movie y otra para serie, que sean diferentes y explique bien el mensaje
// Excepción para instancia inválida
class InvalidMovieException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class movie is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidMovieException";
    }
}

// Excepción para instancia inválida de usuario
class InvalidUserInstanceException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class User is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidUserInstanceException";
    }
}

// Excepción para instancia inválida de coordenada
class InvalidCoordinateException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class Coordinate is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidCoordinateException";
    }
}
// //Excepción personalizada para indicar valores vacios.
// class EmptyValueException extends BaseException {
//     constructor(param, fileName, lineNumber) {
//         super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
//         this.param = param;
//         this.name = "EmptyValueException";
//     }
// }

export {
    BaseException, InvalidNameException, InvalidLastNameException, InvalidBirthException, InvalidPictureException, InvalidDescriptionException,
    InvalidDurationException, InvalidLinkException, AbstractClassException,InvalidProductionException,InvalidMovieException,
    InvalidUserInstanceException,InvalidCoordinateException
}