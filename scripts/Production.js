import { AbstractClassException,InvalidProductionException} from "./Exception.js";


const REGEX_NATIONALITY = /^[ a-zA-Záéíóú]+/; // Pattern for nationality
const REGEX_PUBLIICATION = /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])(\/)(\d{4})$/;// Pattern for publication date
const REGEX_IMG = /.*(png|jpg|jpeg|gif)$/;

class Production{

    // Function to create a date
    #createDate(date) {
        // As we have developed the program, the third position (2) will be the delimiter
        let separator = date[2];
        let arrayDate = date.split(separator, 3);
        return  new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    }

    // Function to create a date string
    #toStringDate(date = ""){

        if (date == ""){ // If we don't get the date, it means you worked with the object property
            date = this.#publication;
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
    
    #title;
    #nacionality;
    #publication;
    #synopsis;
    #image;

    constructor(title, nationality = "", publication, synopsis = "", image = ""){
        // abstract class
        if (new.target === Production) throw new AbstractClassException("Production");
    
        if (!isNaN(title) || title.trim() === "") throw new InvalidProductionException("title"); // title check

        // nationality check
        if (isNaN(nationality)) nationality = nationality.trim();
        if (!REGEX_NATIONALITY.test(nationality) && nationality != "") throw new InvalidProductionException("nationality");

        // publication check
        if (!REGEX_PUBLIICATION.test(publication)) throw new InvalidProductionException("publication date");
        // We check that the date is not modified when it is created with incorrect data
        if (publication != this.#toStringDate(this.#createDate(publication))) throw new InvalidProductionException("publication date");

        // synopsis check
        if ((!isNaN(synopsis) || typeof synopsis != "string") && synopsis.trim() != "") throw new InvalidProductionException("synopsis");

        // image check
        if (!REGEX_IMG.test(image) && image.trim() != "") throw new InvalidProductionException("image");

        // Set the property values
        this.#title = title;
        this.#nacionality = nationality;
        this.#publication = this.#createDate(publication);
        this.#synopsis = synopsis;
        this.#image = image;
    }
}

export default Production;