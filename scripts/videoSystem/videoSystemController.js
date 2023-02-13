"use strict";

import VideoSystem from "./VideoSystemModel.js";

class VideoSystemController {
    #videoSystem;
    #videoSystemView;

    #loadVideoSystemObjects() {
        // Categories
        let cat1 = this.#videoSystem.getCategory("Fantasía");
        let cat2 = this.#videoSystem.getCategory("Comedia");
        let cat3 = this.#videoSystem.getCategory("Horror");
        this.#videoSystem.addCategory(cat1);
        this.#videoSystem.addCategory(cat2);
        this.#videoSystem.addCategory(cat3);

        // Productions
        var movie1 = this.#videoSystem.getMovie("Black Adams", "Canada", "30/10/2022", "Synopsis", "descarga.jpg");
        var movie2 = this.#videoSystem.getMovie("Free Guy", "United States", "13/08/2021", "Synopsis", "descarga.jpg");
        var movie3 = this.#videoSystem.getMovie("Deadpool", "Canada", "12/02/2016", "Synopsis", "descarga.jpg");
        var movie4 = this.#videoSystem.getMovie("The Invitation", "United States", "26/08/2022", "Synopsis", "descarga.jpg");
        var movie5 = this.#videoSystem.getMovie("Nop", "United States", "22/07/2022", "Synopsis", "descarga.jpg");
        var movie6 = this.#videoSystem.getMovie("De uskyldige", "Norway", "27/08/2021", "Synopsis", "descarga.jpg");
        var serie1 = this.#videoSystem.getSerie("The Flash", "United States", "07/10/2014", "Synopsis", "descarga.jpg");
        var serie2 = this.#videoSystem.getSerie("Wednesday", "United States", "23/11/2022", "Synopsis", "descarga.jpg");
        var serie3 = this.#videoSystem.getSerie("Big Bang Theory", "United States", "24/09/2007", "Synopsis", "descarga.jpg");
        var serie4 = this.#videoSystem.getSerie("The Fresh Prince of Bel-Air", "United States", "10/11/1990", "Synopsis", "descarga.jpg");
        var serie5 = this.#videoSystem.getSerie("Ted Lasso", "United States", "14/08/2020", "Synopsis", "descarga.jpg");
        var serie6 = this.#videoSystem.getSerie("Paranormal", "Egypt", "05/11/2020", "Synopsis", "descarga.jpg");
        // Testear
        // this.#videoSystem.addProduction(movie1, movie2, movie3);
        this.#videoSystem.assignCategory(cat1, movie1, serie1, serie2, serie3);
        this.#videoSystem.assignCategory(cat2, movie2, movie3, serie4, serie5);
        this.#videoSystem.assignCategory(cat3, serie6, movie4, movie5, movie6);

        // Directors
        var director1 = this.#videoSystem.getDirector("Jaume", "Collet", "Serra", "00000001A", "23/03/1974");
        var directorTemporal = this.#videoSystem.getDirector("Temporal", "Temporal", "", "88888888A", "23/03/1974");

        // Actors
        var actor1 = this.#videoSystem.getActor("Dwayne", "Johnson", "", "00001001A", "02/05/1972");
        var actor2 = this.#videoSystem.getActor("Aldis", "Hodge", "", "00001002A", "20/09/1986");
        var actor3 = this.#videoSystem.getActor("Ryan", "Reynolds", "", "00001003A", "23/10/1976");
        var actorTemporal = this.#videoSystem.getActor("Temporal", "Temporal", "", "99999999A", "23/10/1976");

        this.#videoSystem.assignDirector(director1, movie1);

        this.#videoSystem.assignActor(actor1, movie1, movie2);
        this.#videoSystem.assignActor(actor2, movie1);
        this.#videoSystem.assignActor(actor3, movie2, movie3);
        // Actor Temporal para seguir con el funcionamiento de nuestra app, una vez terminada se estableceran los actores y direcores correctamente
        this.#videoSystem.assignActor(actorTemporal, movie4, movie5, movie6, serie1, serie2, serie3, serie4, serie5, serie6);
        this.#videoSystem.assignDirector(director1, movie2, movie3, movie4, movie5, movie6, serie1, serie2, serie3, serie4, serie5, serie6);

        // User
        let adminUser = this.#videoSystem.getUser("Javier", "javiermb@gmail.com", "Abcd1234");
        this.#videoSystem.addUser(adminUser);
    }

    constructor(model, view) {
        console.log('Manager controller');
        this.#videoSystem = model;
        this.#videoSystemView = view;

        this.onLoad();
        this.onInit();

        // Enlazamos handlers con la vista
        this.#videoSystemView.bindInit(this.handleInit);
    }

    onLoad = () => {
        this.#loadVideoSystemObjects();
        this.onListCategories();

        // this.onListRandomProductions();
    }

    onInit = () => {
        this.#videoSystemView.showCategories(this.#videoSystem.categories);
        this.onListRandomProductions();
    }

    onListCategories = () =>{
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystem.categories);
    }

    onListRandomProductions = () => {
        let productionNumber = this.#videoSystem.getProductionNumber();
        let randomNumbers = []; 
        let productionAmount = 3;

        for (let i = 0; i < productionAmount; i++) {
            let number = Math.round(Math.random() * (productionNumber - 1));
            while (randomNumbers.includes(number)) {
                number = Math.round(Math.random() * (productionNumber - 1));
            }
            randomNumbers.push(number);
        }
        
        this.#videoSystemView.showProductions(randomNumbers, this.#videoSystem.productions);
    }

    handleInit = () => {
		this.onInit();
	}
}

export default VideoSystemController;