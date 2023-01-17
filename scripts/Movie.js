"use strict";
import Production from "./Production.js";
import Resource from "./Resource.js";
import { InvalidMovieException } from "./Exception.js";

class Movie extends Production {

    #resource;
    #locations = new Array();

    // TODO: Crear localización por defecto una vez creada la clase
    constructor(title, nationality, publication, synopsis, image, resource = new Resource(0, "www.noLink.com"), locations) {

        super(title, nationality, publication, synopsis, image);

        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidMovieException("resource");
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidMovieException("coordinate");

        this.#resource = resource;
        this.#locations.push(locations);
    }

    set resource(resource) {
        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidMovieException("resource");
        this.#resource = resource;
    }

    set locations(locations){
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidMovieException("coordinate");
        this.#locations.push(locations);
    }
}

export default Movie;