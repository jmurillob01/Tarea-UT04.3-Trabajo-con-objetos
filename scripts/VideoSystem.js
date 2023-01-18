"use strict";


let VideoSystem = (function (){
    let instantiated;

    function init(){ // Inicialización del singleton

        class VideoSystem{

        }

        let instace = new VideoSystem(); //Devolvemos el objeto VideoSystem para que sea una instancia única.
        Object.freeze(instace);
        return instance;
    } // Fin inicialización del singleton
    return{
        // Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
    };
})();

export default VideoSystem();