"use strict";

import { InvalidResourceException } from "./Exception.js";

class Resource{
    #duration;
    #link;

    // Constructor
    constructor(duration, link){

        // Duration check
        if (isNaN(duration) || duration <= 0) throw new InvalidResourceException("duration");
        // Link check
        if (!isNaN(link) || link.trim() == "") throw new InvalidResourceException("link");

        this.#duration = duration;
        this.#link = link;
    }
}

export default Resource;