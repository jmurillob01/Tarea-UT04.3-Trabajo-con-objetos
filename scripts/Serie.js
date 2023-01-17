"use strict";
import Production from "./Production.js";
import Resource from "./Resource.js";
import { InvalidSerieException } from "./Exception.js";
import Coordinate from "./Coordinate.js";

class Serie extends Production {

    #resource;
    #locations = new Array();
    #season;

    constructor(title, nationality, publication, synopsis, image, resource = new Resource(0, "www.noLink.com"), locations = new Coordinate(0,0), seasons = 0) {

        super(title, nationality, publication, synopsis, image);

        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidSerieException("resource");
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidSerieException("coordinate");
        // Seasons check
        if (isNaN(seasons) || seasons < 0) throw new InvalidSerieException("season");

        this.#resource = resource;
        this.#locations.push(locations);
        this.#season = Math.round(seasons);
    }

    set resource(resource) {
        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidSerieException("resource");
        this.#resource = resource;
    }

    set locations(locations) {
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidSerieException("coordinate");
        this.#locations.push(locations);
    }

    set seasons(season) {
        // Seasons check
        if (isNaN(seasons) || seasons < 0) throw new InvalidSerieException("season");
        this.#season = Math.round(seasons);
    }
}

export default Serie;