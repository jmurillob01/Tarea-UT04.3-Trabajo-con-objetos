"use strict";

import { InvalidResourceException } from "./Exception.js";

class Resource{
    #duration;
    #link;

    // Constructor
    constructor(duration = 1, link="www.noLink.com"){

        // Duration check
        if (isNaN(duration) || duration <= 0) throw new InvalidResourceException("duration");
        // Link check
        if (!isNaN(link) || link.trim() == "") throw new InvalidResourceException("link");

        this.#duration = duration;
        this.#link = link;
    }

    set duration(duration){
        // Duration check
        if (isNaN(duration) || duration <= 0) throw new InvalidResourceException("duration");

        this.#duration = duration;
    }

    set link(link){
        // Link check
        if (!isNaN(link) || link.trim() == "") throw new InvalidResourceException("link");

        this.#link = link;
    }
}

export default Resource;