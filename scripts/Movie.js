"use strict";
import Production from "./Production.js";
import Resource from "./Resource.js";
import {InvalidObjectInstance} from "./Exception.js";

class Movie extends Production{

    #resource;
    #locations = new Array();
    constructor(title, nationality, publication, synopsis, image, resource = new Resource(0, "www.noLink.com"), locations){

        super(title, nationality, publication, synopsis, image);

        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidObjectInstance("resource");
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidObjectInstance("coordinate");

        this.#resource = resource;
        this.#locations.push(locations);
    }
}

export default Movie;