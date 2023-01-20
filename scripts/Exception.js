"use strict";

// Base exception to create all other exceptions.
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

// Invalid constructor access exception
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

// Custom exception to indicate wrong category
class InvalidCategoryException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The param " + param + " from Category is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidCategoryException";
    }
}

// Custom exception to indicate wrong Person
class InvalidPersonException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The param " + param + " from Person is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidPersonException";
    }
}

class InvalidPersonDNIException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Error: It is not allowed to change a person's identification");
        this.param = param;
        this.name = "InvalidPersonDNIException";
    }
}

// Custom exception to indicate wrong Resource
class InvalidResourceException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from resource is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidResourceException";
    }
}

// Custom exception for abstract class
class AbstractClassException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The class " + param + " is abstract.", fileName, lineNumber);
        this.param = param;
        this.name = "AbstractClassException";
    }
}

// Custom exception to indicate wrong Production
class InvalidProductionException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The property " + param + " is invalid in the son who inherits.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidProductionException";
    }
}
// Custom exception to indicate wrong Movie
class InvalidMovieException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class Serie is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidMovieException";
    }
}

// Custom exception to indicate wrong Serie
class InvalidSerieException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class Serie is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidSerieException";
    }
}

// Custom exception to indicate wrong User
class InvalidUserInstanceException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class User is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidUserInstanceException";
    }
}

// Custom exception to indicate wrong Coordinate
class InvalidCoordinateException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class Coordinate is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidCoordinateException";
    }
}

// Custom exception to indicate wrong VideoSystem
class InvalidVideoSystemException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The " + param + " from class VideoSystem is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "InvalidVideoSystemException";
    }
}

class CategoryVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryVideoSystemException";
	}
}

class CategoryExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The category exists in the video system.", fileName, lineNumber);
		this.name = "CategoryExistsVideoSystemException";
	}
}

class CategoryNonExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The category doesn't exists in the video system.", fileName, lineNumber);
		this.name = "CategoryNonExistsVideoSystemException";
	}
}


class DefaultCategoryVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The deafult category can't be removed.", fileName, lineNumber);
		this.name = "DefaultCategoryVideoSystemException";
	}
}

class UserVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a User parameter.", fileName, lineNumber);
		this.name = "UserVideoSystemException";
	}
}

class UserExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The user exists in the video system.", fileName, lineNumber);
		this.name = "UserExistsVideoSystemException";
	}
}

class UserNonExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The user doesn't exists in the video system.", fileName, lineNumber);
		this.name = "UserExistsVideoSystemException";
	}
}

class ProductionVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a production parameter.", fileName, lineNumber);
		this.name = "ProductionVideoSystemException";
	}
}

class ProductionExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The production exists in the video system.", fileName, lineNumber);
		this.name = "ProductionExistsVideoSystemException";
	}
}

class ProductionNonExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The production doesn't exists in the video system.", fileName, lineNumber);
		this.name = "ProductionNonExistsVideoSystemException";
	}
}

class PersonVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Person parameter.", fileName, lineNumber);
		this.name = "PersonVideoSystemException";
	}
}

class PersonExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The person exists in the video system.", fileName, lineNumber);
		this.name = "PersonExistsVideoSystemException";
	}
}

class PersonNonExistsVideoSystemException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The person doesn't exists in the video system.", fileName, lineNumber);
		this.name = "PersonNonExistsVideoSystemException";
	}
}


export {
    BaseException, InvalidCategoryException, InvalidPersonException,InvalidPersonDNIException,InvalidResourceException,
    AbstractClassException,InvalidProductionException,InvalidMovieException,InvalidSerieException,
    InvalidUserInstanceException,InvalidCoordinateException,InvalidVideoSystemException,CategoryVideoSystemException,
    CategoryExistsVideoSystemException,CategoryNonExistsVideoSystemException, DefaultCategoryVideoSystemException,
    UserVideoSystemException,UserExistsVideoSystemException,UserNonExistsVideoSystemException,
    ProductionVideoSystemException,ProductionExistsVideoSystemException,ProductionNonExistsVideoSystemException,
    PersonVideoSystemException,PersonExistsVideoSystemException,PersonNonExistsVideoSystemException

}