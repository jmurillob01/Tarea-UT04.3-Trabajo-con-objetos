"use strict";

import { InvalidDurationException, InvalidLinkException } from "./Exception.js";

class Resource{
    // properties
    #duration;
    #link;

    // Constructor
    constructor(duration, link){

        // Control
        if (isNaN(duration) || duration <= 0) throw new InvalidDurationException(duration);
        if (!isNaN(link) || link.trim() == "") throw new InvalidLinkException(link);

        this.#duration = duration;
        this.#link = link;
    }
}

export default Resource;