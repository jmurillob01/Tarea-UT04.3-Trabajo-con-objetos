"use strict";

import {InvalidCoordinateException} from "./Exception.js";

const REGEX_LATITUDE = /^(\-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?))$/;
const REGEX_LONGITUDE = /^(\-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/;

class Coordinate{
    #latitude;
    #longitude;

    constructor(latitude, longitude){
        // Latitude check
        if (!REGEX_LATITUDE.test(latitude)) throw new InvalidCoordinateException("latitude");
        // Longitude check
        if (!REGEX_LONGITUDE.test(longitude)) throw new InvalidCoordinateException("latitude");

        this.#latitude = latitude;
        this.#longitude = longitude;
    }
}

export default Coordinate;