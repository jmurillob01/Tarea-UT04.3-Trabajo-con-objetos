"use strict";
import Production from "./Production.js";
import Resource from "./Resource.js";
import { InvalidProductionInstanceException } from "./Exception.js";

class Serie extends Production {

    #resource;
    #locations = new Array();
    #season;

    // TODO: Crear localización por defecto una vez creada la clase
    constructor(title, nationality, publication, synopsis, image, resource = new Resource(0, "www.noLink.com"), locations, seasons = 0) {

        super(title, nationality, publication, synopsis, image);

        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidProductionInstanceException("resource", "Serie");
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidProductionInstanceException("coordinate", "Serie");
        // Seasons check
        if (isNaN(seasons) || seasons < 0) throw new InvalidProductionInstanceException("season", "Serie");

        this.#resource = resource;
        this.#locations.push(locations);
        this.#season = Math.round(seasons);
    }

    set resource(resource) {
        // Resource check
        if (!(resource instanceof Resource)) throw new InvalidProductionInstanceException("resource", "Serie");
        this.#resource = resource;
    }

    set locations(locations) {
        // Coordinate check
        if (!(locations instanceof Coordinate)) throw new InvalidProductionInstanceException("coordinate", "Serie");
        this.#locations.push(locations);
    }

    set seasons(season) {
        // Seasons check
        if (isNaN(seasons) || seasons < 0) throw new InvalidProductionInstanceException("season", "Serie");
        this.#season = Math.round(seasons);
    }
}

export default Serie;