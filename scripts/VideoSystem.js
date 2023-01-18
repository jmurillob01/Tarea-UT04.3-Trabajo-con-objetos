"use strict";


let VideoSystem = (function (){
    let instantiated;

    function init(){ // Singleton initialization

        class VideoSystem{
            #name; // Name of the system
            #users = []; // Users from the system
            #productions = []; // Productions from the system
            #categories = []; // Categories from the system
            #actors = []; // Actors from the system
            #director = []; // Directors from the system

            /**
                Structure to store objects
               
                #director[
                    {
                        director: person,
                        productions: [productions] // Array containing productions reference
                    }
                ]
                #actors[
                    {
                        actor: person,
                        productions: [productions] // Array containing productions reference
                    }
                ]:
                #categories[
                    { 
						category: category,
						productions: [productions] // Array containing productions reference
					}
                ]
                #productions: [] // Array containing system productions
                #users: [] // Array containing system users
                #name: // String containing name from the system
             */
        }

        let instace = new VideoSystem(); // We return the VideoSystem object to be a single instance.
        Object.freeze(instace);
        return instance;
    } // End of singleton initialization
    return{
        // Return an object with the getInstance method
		getInstance: function () {
			if (!instantiated) { // If the instantiated variable is undefined, run init.
				instantiated = init(); // Instantiated contains the single object
			}
			return instantiated; // If it is already assigned, it returns the assignment.
		}
    };
})();

export default VideoSystem();