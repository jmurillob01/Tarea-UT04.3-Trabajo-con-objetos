import { AbstractClassException,InvalidProductionException} from "./Exception.js";


const REGEX_NATIONALITY = /^[ a-zA-Záéíóú]+/; // Pattern for nationality

class Production{
    
    #title;
    #nacionality;
    #publication;
    #synopsis;
    #image;

    constructor(title, nationality = "", publication, synopsis = "", image = ""){
        // abstract class
        // if (new.target === Production) throw new AbstractClassException("Production");  
    
        if (!isNaN(title) || title.trim() === "") throw new InvalidProductionException("title");

        if (isNaN(nationality)) nationality = nationality.trim();

        if (!REGEX_NATIONALITY.test(nationality) && nationality != "") throw new InvalidProductionException("nationality");
    }
}

export default Production;