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
        var movie1 = this.#videoSystem.getMovie("Black Adam", "Canada", "30/10/2022", "Unos arqueólogos liberan de su tumba a Black Adam, quien llevaba 5000 años preso tras haber recibido los poderes de los dioses. De nuevo entre los humanos, Black Adam se dispone a imponer su justicia, muy diferente a la del mundo en el que despertó.", "/productions/Black_Adam.jpg");
        var movie2 = this.#videoSystem.getMovie("Free Guy", "United States", "13/08/2021", "Un cajero de un banco descubre que en realidad es un personaje sin papel dentro de un brutal videojuego de mundo interactivo.", "/productions/Free_Guy.jpg");
        var movie3 = this.#videoSystem.getMovie("Deadpool", "Canada", "12/02/2016", "Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales que le convierten en Deadpool. Armado con sus nuevas habilidades y un retorcido sentido del humor tratará de dar caza al hombre que casi destruye su vida.", "/productions/Deadpool.jpg");
        var movie4 = this.#videoSystem.getMovie("The Invitation", "United States", "26/08/2022", "Tras morir su hermana, Evie queda sin familiares, pero un análisis de ADN le revela la existencia de un primo distante. La nueva familia la invita a una boda en Inglaterra, y lo que empieza como un cuento de hadas se transforma en una pesadilla.", "/productions/The_Invitation.jpg");
        var movie5 = this.#videoSystem.getMovie("Nop", "United States", "22/07/2022", "Los cuidadores de un rancho de caballos de California se cruzan con una fuerza misteriosa que afecta el comportamiento humano y animal.", "/productions/Nop.jpg");
        var movie6 = this.#videoSystem.getMovie("The Innocents", "Norway", "27/08/2021", "Durante el resplandeciente verano nórdico, un grupo de niños revela sus oscuros y misteriosos poderes mientras los adultos no miran.", "/productions/The_Innocents.jpg");
        var serie1 = this.#videoSystem.getSerie("The Flash", "United States", "07/10/2014", "Flash viaja a través del tiempo para evitar el asesinato de su madre, pero sin saberlo provoca cambios que resultan en la creación de un multiverso.", "/productions/The_Flash.jpg");
        var serie2 = this.#videoSystem.getSerie("Wednesday", "United States", "23/11/2022", "Mientras asiste a la Academia Nevermore, Miércoles Addams intenta dominar su incipiente habilidad psíquica, frustrar una ola de asesinatos y resolver el misterio que envolvió a sus padres 25 años atrás.", "/productions/Wednesday.jpg");
        var serie3 = this.#videoSystem.getSerie("Big Bang Theory", "United States", "24/09/2007", "Leonard y Sheldon son dos cerebros privilegiados que pueden ser capaces de decirle a todo el mundo más de lo que quiere saber sobre la física cuántica, pero que no tienen ni la menor idea de cómo relacionarse socialmente, sobre todo cuando se trata de mujeres.", "/productions/The_BigBan_Theory.jpg");
        var serie4 = this.#videoSystem.getSerie("El príncipe de Bel-Air", "United States", "10/11/1990", "Will Smith actúa más o menos como él es en la vida real, en esta comedia satírica descomplicada de NBC. La madre ficticia de Will lo envía lejos del barrio agitado de Filadelfia donde vivía, a la casa de su tío Phil y su tía Vivan en Bel-Air", "/productions/El_Principe_Bell-Air.jpg");
        var serie5 = this.#videoSystem.getSerie("Ted Lasso", "United States", "14/08/2020", "Ted Lasso, un entrenador de fútbol de poca monta, es contratado para entrenar a un equipo de fútbol profesional en Inglaterra, a pesar de no tener experiencia como entrenador.", "/productions/Ted_Lasso.jpg");
        var serie6 = this.#videoSystem.getSerie("Paranormal", "Egypt", "05/11/2020", "En la década de 1960, el hematólogo Dr. Refaat Ismail se convierte en un sujeto a quien acudir para las investigaciones paranormales.", "/productions/Paranormal.jpg");
        // Testear
        // this.#videoSystem.addProduction(movie1, movie2, movie3);
        this.#videoSystem.assignCategory(cat1, movie1, serie1, serie2, serie3);
        this.#videoSystem.assignCategory(cat2, movie2, movie3, serie4, serie5);
        this.#videoSystem.assignCategory(cat3, serie6, movie4, movie5, movie6);

        // Directors
        var director1 = this.#videoSystem.getDirector("Jaume", "Collet", "Serra", "00000001A", "23/03/1974", "Jaume_Collet.jpg");
        var directorTemporal = this.#videoSystem.getDirector("Temporal", "Temporal", "", "88888888A", "23/03/1974");

        // Actors
        var actor1 = this.#videoSystem.getActor("Dwayne", "Johnson", "", "00001001A", "02/05/1972", "Dwayne_Johnson.jpg");
        var actor2 = this.#videoSystem.getActor("Aldis", "Hodge", "", "00001002A", "20/09/1986", "Aldis_Hodge.jpg");
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
        // Mostrar producciones de una categoría
        this.#videoSystemView.bindProductionsCategoryList(
            this.handleProductionsCategoryList
        );
    }

    onListCategories = () =>{ // Muestra las categorías en el nav
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystem.categories);
        this.#videoSystemView.bindProductionsCategoryListInMenu(
            this.handleProductionsCategoryList
        );
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

    handleProductionsCategoryList = (title) => {
        let category = this.#videoSystem.getCategory(title);
        this.#videoSystemView.listProductions(this.#videoSystem.getProductionsObjectCategory(category), category.name);

        // ES - Aquí hacer llamada para asignar el click de las producciones
        this.#videoSystemView.bindProductionInformation(
            this.handleProductionInformation
        );
        // this.#managerView.bindShowProduct(this.handleShowProduct);
    }

    handleProductionInformation = (title) => {
        let production = this.#videoSystem.getProductionObject(title);

        this.#videoSystemView.listProductionInformation(production, this.#videoSystem.getCast(production), this.#videoSystem.getDirectorsDepartment(production));

    }
}

export default VideoSystemController;