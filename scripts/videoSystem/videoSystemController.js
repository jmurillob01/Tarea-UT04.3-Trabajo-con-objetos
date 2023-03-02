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
        var serie3 = this.#videoSystem.getSerie("Arrow", "United States", "10/10/2012", "Cuando Oliver Queen, un billonario mujeriego, que se presumía había fallecido, regresa a casa a la ciudad Starling, luego de cinco años de quedar atrapado en una isla remota en el Pacífico, él esconde los cambios creados por la experiencia en sí mismo, mientras busca la reconciliación con su ex Laurel; él secretamente lleva dos vidas paralelas, en el día actúa como el filántropo descomplicado que solía ser y en la noche saca a relucir su ego alterno como Arrow. Este personaje es una clase de super héroe que trata de corregir los errores de su familia y restaurar la gloria que tenía la ciudad previamente, su misión se complica por el padre de Laurel, quien es el detective Quentin Lance y está determinado a poner al vigilante en la cárcel.", "/productions/Arrow.jpg");
        var serie4 = this.#videoSystem.getSerie("El príncipe de Bel-Air", "United States", "10/11/1990", "Will Smith actúa más o menos como él es en la vida real, en esta comedia satírica descomplicada de NBC. La madre ficticia de Will lo envía lejos del barrio agitado de Filadelfia donde vivía, a la casa de su tío Phil y su tía Vivan en Bel-Air", "/productions/El_Principe_Bell-Air.jpg");
        var serie5 = this.#videoSystem.getSerie("Ted Lasso", "United States", "19/08/2020", "Ted Lasso, un entrenador de fútbol de poca monta, es contratado para entrenar a un equipo de fútbol profesional en Inglaterra, a pesar de no tener experiencia como entrenador.", "/productions/Ted_Lasso.jpg");
        var serie6 = this.#videoSystem.getSerie("Paranormal", "Egypt", "05/11/2020", "En la década de 1960, el hematólogo Dr. Refaat Ismail se convierte en un sujeto a quien acudir para las investigaciones paranormales.", "/productions/Paranormal.jpg");

        this.#videoSystem.assignCategory(cat1, movie1, serie1, serie2, serie3);
        this.#videoSystem.assignCategory(cat2, movie2, movie3, serie4, serie5);
        this.#videoSystem.assignCategory(cat3, serie6, movie4, movie5, movie6);

        // Directors
        var director1 = this.#videoSystem.getDirector("Jaume", "Collet", "Serra", "00000001A", "23/03/1974", "/persons/Jaume_Collet.jpg", "director");
        var director2 = this.#videoSystem.getDirector("Tim", "Miller", "", "00000002A", "10/09/1964", "/persons/Tim_Miller.jpg", "director");
        var director3 = this.#videoSystem.getDirector("Jessica M.", "Thompson", "", "00000003A", "31/03/1985", "/persons/Jessica_M.jpg", "director");
        var director4 = this.#videoSystem.getDirector("Jordan", "Peele", "", "00000004A", "21/02/1979", "/persons/Jordan_Peele.jpg", "director");
        var director5 = this.#videoSystem.getDirector("Eskil", "Vogt", "", "00000005A", "31/10/1974", "/persons/Eskil_Vogt.jpg", "director");
        var director6 = this.#videoSystem.getDirector("Greg", "Berlanti", "", "00000006A", "24/05/1972", "/persons/Greg_Berlanti.jpg", "director");
        var director7 = this.#videoSystem.getDirector("Miles", "Millar", "", "00000007A", "01/01/1967", "/persons/Miles_Millar.jpg", "director");
        var director8 = this.#videoSystem.getDirector("Quincy", "Delight", "", "00000008A", "14/03/1933", "/persons/Quincy_Delight.jpg", "director");
        var director9 = this.#videoSystem.getDirector("Brendan E.", "Hunt", "", "00000009A", "01/01/1972", "/persons/Brendan_Hunt.jpg", "director");
        var director10 = this.#videoSystem.getDirector("Ahmed", "Khaled", "Tawfik", "00000010A", "10/06/1962", "/persons/Ahmed_Khaled.jpg", "director");

        // Actors
        var actor1 = this.#videoSystem.getActor("Dwayne", "Johnson", "", "00001001A", "02/05/1972", "/persons/Dwayne_Johnson.jpg", "actor");
        var actor2 = this.#videoSystem.getActor("Aldis", "Hodge", "", "00001002A", "20/09/1986", "/persons/Aldis_Hodge.jpg", "actor");
        var actor3 = this.#videoSystem.getActor("Ryan", "Reynolds", "", "00001003A", "23/10/1976", "/persons/Ryan_Reynolds.jpg", "actor");
        var actor4 = this.#videoSystem.getActor("Stan", "Lee", "", "00001004A", "28/12/1922", "/persons/Stan_Lee.jpg", "actor");
        var actor5 = this.#videoSystem.getActor("Thomas", "Doherty", "", "00001005A", "21/04/1995", "/persons/Thomas_Doherty.jpg", "actor");
        var actor6 = this.#videoSystem.getActor("Nathalie", "Joanne", "", "00001007A", "02/03/1989", "/persons/Nathalie_Emmanuel.jpg", "actor");
        var actor7 = this.#videoSystem.getActor("Daniel", "Kaluuya", "", "00001008A", "24/02/1989", "/persons/Daniel_Kaluuya.jpg", "actor");
        var actor8 = this.#videoSystem.getActor("Keke", "Palmer", "", "00001009A", "26/08/1992", "/persons/Keke_Palmer.jpg", "actor");
        var actor9 = this.#videoSystem.getActor("Morten", "Svartveit", "", "00001010A", "26/06/1978", "/persons/Morten_Svartveit.jpg", "actor");
        var actor10 = this.#videoSystem.getActor("Marius", "Kolbenstvedt", "", "00001011A", "01/01/1969", "/persons/Marius_Kolbenstvedt.jpg", "actor");
        var actor11 = this.#videoSystem.getActor("Grant", "Gustin", "", "00001012A", "14/01/1990", "/persons/Grant_Gustin.jpg", "actor");
        var actor12 = this.#videoSystem.getActor("Carlos", "Valdes", "", "00001013A", "20/04/1989", "/persons/Carlos_Valdes.jpg", "actor");
        var actor13 = this.#videoSystem.getActor("Stephen", "Adam", "Amell", "00001014A", "08/05/1981", "/persons/Stephen_Adam.jpg", "actor");
        var actor14 = this.#videoSystem.getActor("Jenna", "Marie", "Ortega ", "00001015A", "27/09/2002", "/persons/Jenna_Ortega.jpg", "actor");
        var actor15 = this.#videoSystem.getActor("Emma", "Myers", "", "00001016A", "02/04/2002", "/persons/Emma_Myers.jpg", "actor");
        var actor16 = this.#videoSystem.getActor("Willard", "Carroll", "Smith", "00001017A", "25/09/1968", "/persons/Will_Smith.jpg", "actor");
        var actor17 = this.#videoSystem.getActor("Alfonso", "Lincoln", "Ribeiro", "00001018A", "21/09/1971", "/persons/Alfonso_Ribeiro.jpg", "actor");
        var actor18 = this.#videoSystem.getActor("Daniel", "Jason", "", "00001019A", "18/09/1975", "/persons/Daniel_Jason.jpg", "actor");
        var actor19 = this.#videoSystem.getActor("Brett", "Goldstein", "", "00001020A", "17/07/1980", "/persons/Brett_Goldstein.jpg", "actor");
        var actor20 = this.#videoSystem.getActor("Ahmed", "Sayed", "", "00001021A", "11/06/1980", "/persons/Ahmed_Sayed.jpg", "actor");
        var actor21 = this.#videoSystem.getActor("Aya", "Samaha", "", "00001022A", "31/03/1992", "/persons/Aya_Samaha.jpg", "actor");

        // Assigns
        this.#videoSystem.assignDirector(director1, movie1);
        this.#videoSystem.assignDirector(director2, movie2, movie3);
        this.#videoSystem.assignDirector(director3, movie4);
        this.#videoSystem.assignDirector(director4, movie5);
        this.#videoSystem.assignDirector(director5, movie6);
        this.#videoSystem.assignDirector(director6, serie1, serie3);
        this.#videoSystem.assignDirector(director7, serie2);
        this.#videoSystem.assignDirector(director8, serie4);
        this.#videoSystem.assignDirector(director9, serie5);
        this.#videoSystem.assignDirector(director10, serie6);

        this.#videoSystem.assignActor(actor1, movie1, movie2);
        this.#videoSystem.assignActor(actor2, movie1);
        this.#videoSystem.assignActor(actor3, movie2, movie3);
        this.#videoSystem.assignActor(actor4, movie3);
        this.#videoSystem.assignActor(actor5, movie4);
        this.#videoSystem.assignActor(actor6, movie4);
        this.#videoSystem.assignActor(actor7, movie5);
        this.#videoSystem.assignActor(actor8, movie5);
        this.#videoSystem.assignActor(actor9, movie6);
        this.#videoSystem.assignActor(actor10, movie6);
        this.#videoSystem.assignActor(actor11, serie1, serie3);
        this.#videoSystem.assignActor(actor12, serie1);
        this.#videoSystem.assignActor(actor13, serie3);
        this.#videoSystem.assignActor(actor14, serie2);
        this.#videoSystem.assignActor(actor15, serie2);
        this.#videoSystem.assignActor(actor16, serie4);
        this.#videoSystem.assignActor(actor17, serie4);
        this.#videoSystem.assignActor(actor18, serie5);
        this.#videoSystem.assignActor(actor19, serie5);
        this.#videoSystem.assignActor(actor20, serie6);
        this.#videoSystem.assignActor(actor21, serie6);

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

        // We bind handlers with the view
        this.#videoSystemView.bindInit(this.handleInit);
    }

    onLoad = () => {
        this.#loadVideoSystemObjects();
        // this.onListCategories();
        this.onListPersons();
        this.onCloseMenu();
        this.onListItemFormMenu(); // by adding the eventListener only on page load, we avoid errors
    }

    onInit = () => {
        this.#videoSystemView.showCategories(this.#videoSystem.categories);
        this.onListRandomProductions();
        // Show productions of a category
        this.#videoSystemView.bindProductionsCategoryList(
            this.handleProductionsCategoryList
        );
        this.onListForms();
        this.onListCategories(); // ES-es Hay que eliminar las categorías si existe
    }

    // Show categories in the nav
    onListCategories = () => {
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystem.categories);
        this.#videoSystemView.bindProductionsCategoryListInMenu(
            this.handleProductionsCategoryList
        );

    }

    onListForms = () => {
        let directors = this.#videoSystem.directors;
        let actors = this.#videoSystem.actors;
        let categories = this.#videoSystem.categories;
        let productions = this.#videoSystem.productions;

        this.#videoSystemView.showFormsModals(directors, actors, categories, productions, this.hProductionPersons);

        this.#videoSystemView.reloadPageCLose( // ES-es Para que al cerrar el modal se recargue la página de forma controlada
            this.handleReloadCloseForm
        );
    }

    onListItemFormMenu = () => {
        this.#videoSystemView.bindFormMenu(
            this.handleNewProductionForm,
            this.handleDeleteProductionForm,
            this.handleRelateProductionForm,
            this.handleNewCategoryForm,
            this.handleReomoveCategoryForm,
            this.handleCreatePersonForm,
            this.handleRemovePersonForm
        );
    }

    onListPersons = () => {
        this.#videoSystemView.bindPersonsNav(
            this.handlePersonsNav
        );
    }

    onCloseMenu = () => {
        this.#videoSystemView.bindCloseWindows(
            this.handleCloseWindows
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

        this.#videoSystemView.bindProductionInformation(
            this.handleProductionInformation
        );
    }

    handleInit = () => {
        this.onInit();
    }

    handleProductionsCategoryList = (title) => {
        let category = this.#videoSystem.getCategory(title);
        this.#videoSystemView.listProductions(this.#videoSystem.getProductionsObjectCategory(category), category.name);

        this.#videoSystemView.bindProductionInformation(
            this.handleProductionInformation
        );
    }

    handleProductionInformation = (title) => {
        let production = this.#videoSystem.getProductionObject(title);

        let category = this.#videoSystem.getCategoryByProduction(title);

        this.#videoSystemView.listProductionInformation(production, this.#videoSystem.getCast(production), this.#videoSystem.getDirectorsDepartment(production), category);

        this.#videoSystemView.bindShowProductInNewWindow(
            this.handleShowProductionsInNewWindow
        );

        this.#videoSystemView.bindProductionPerson(
            this.handleProductionPerson
        );
    }

    handleProductionPerson = (dni, rol) => { // Actors from a production
        let productionPerson;
        let person;
        if (rol == "director") { // Director
            productionPerson = this.#videoSystem.getProductionsDirectorByDNI(dni);
            person = this.#videoSystem.getDirectorByDNI(dni).director;
        } else { // Actor
            productionPerson = this.#videoSystem.getProductionsActorByDNI(dni);
            person = this.#videoSystem.getActorByDNI(dni).actor;
        }
        this.#videoSystemView.listPersonProductions(productionPerson, person);

        this.#videoSystemView.bindProductionInformation(
            this.handleProductionInformation
        );
    }

    handlePersonsNav = (rol) => {
        let personsList;

        if (rol == "director") { // Director
            personsList = this.#videoSystem.directors;
        } else { // Actor
            personsList = this.#videoSystem.actors;
        }

        this.#videoSystemView.listPersons(personsList, rol);

        this.#videoSystemView.bindProductionPerson(
            this.handleProductionPerson
        );
    }

    handleShowProductionsInNewWindow = (title) => {
        try {

            let production = this.#videoSystem.getProductionObject(title);

            let category = this.#videoSystem.getCategoryByProduction(title);

            this.#videoSystemView.listProductionInformationNewWindow(production, this.#videoSystem.getCast(production), this.#videoSystem.getDirectorsDepartment(production), category);

        } catch (error) {
            console.log(error.message);
        }
    }

    handleCloseWindows = () => {
        let windows = this.#videoSystemView.windows;

        windows.forEach(windowElement => {
            windowElement.close();
            this.#videoSystemView.windows.delete(windowElement.id);
        });
    }

    handleNewProductionForm = () => {
        this.#videoSystemView.bindNewProductionForm(this.handleCreateProduction);
    }

    handleDeleteProductionForm = () => {
        this.#videoSystemView.bindDeleteProductionForm(this.handleDeleteProduction);
    }

    handleRelateProductionForm = () => {
        this.#videoSystemView.bindRelateProductionForm(this.handleRelateProduction);
    }

    handleNewCategoryForm = () => {
        this.#videoSystemView.bindNewCategoryForm(this.handleCreateCategory);
    }

    handleReomoveCategoryForm = () => {
        this.#videoSystemView.bindRemoveCategoryForm(this.handleRemoveCategory);
    }

    handleCreatePersonForm = () => {
        this.#videoSystemView.bindCreatePersonForm(this.handleCreatePerson);
    }

    handleRemovePersonForm = () => {
        this.#videoSystemView.bindRemovePersonForm(this.handleRemovePerson);
    }

    hProductionPersons = (title) => { // ES-es Funciona para recibir el título al seleccionar, podemos obtener el casting
        let prod = this.#videoSystem.getProductionObject(title);

        let casting = this.#videoSystem.getCast(prod);
        let castingNif = [];

        for (let actor of casting) {
            castingNif.push(actor.actor.dni);
        }

        let directors = this.#videoSystem.getDirectorsDepartment(prod);
        let directorsNif = [];
        for (let director of directors) {
            directorsNif.push(director.director.dni);
        }

        return { castingNif, directorsNif };
    }

    handleCreateProduction = (productionType, categories, actors, director, title, nationality, date, synopsis, imagePath) => {
        let prod;
        try {
            if (productionType = "movie") {
                prod = this.#videoSystem.getMovie(title, nationality, date, synopsis, imagePath);
            } else {
                prod = this.#videoSystem.getSerie(title, nationality, date, synopsis, imagePath);
            }
            for (let category of categories) {
                this.#videoSystem.assignCategory(this.#videoSystem.getCategory(category), prod);
            }

            for (let actor of actors) {
                let person = this.#videoSystem.getActorByDNI(actor);
                this.#videoSystem.assignActor(person.actor, prod);
            }

            if (director != "") {
                let person = this.#videoSystem.getDirectorByDNI(director);
                this.#videoSystem.assignDirector(person.director, prod);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    handleDeleteProduction = (title) => {
        let prod = this.#videoSystem.getProductionObject(title);

        try {
            this.#videoSystem.removeProduction(prod);
        } catch (error) {
            console.error(error.message);
        }
    }

    handleRelateProduction = (title, relation, actors, directors) => {

        let prod = this.#videoSystem.getProductionObject(title);
        if (relation == "assign") {
            for (let actor of actors) {
                let person = this.#videoSystem.getActorByDNI(actor);
                this.#videoSystem.assignActor(person.actor, prod);
            }

            for (let director of directors) {
                let person = this.#videoSystem.getDirectorByDNI(director);
                this.#videoSystem.assignDirector(person.director, prod);
            }
        } else {
            for (let actor of actors) {
                let person = this.#videoSystem.getActorByDNI(actor);
                this.#videoSystem.deassignActor(person.actor, prod);
            }

            for (let director of directors) {
                let person = this.#videoSystem.getDirectorByDNI(director);
                this.#videoSystem.deassignDirector(person.director, prod);
            }
        }
    }

    handleCreateCategory = (title, desc) => {
        let cat = this.#videoSystem.getCategory(title);
        cat.description = desc;

        try {
            this.#videoSystem.addCategory(cat);
        } catch (error) {
            // console.error(error.message);
        }
    }

    handleRemoveCategory = (title) => {
        let cat = this.#videoSystem.getCategory(title);

        try {
            this.#videoSystem.removeCategory(cat);
        } catch (error) {

        }
    }

    handleCreatePerson = (personName, personLastname1, personLastname2, personDNI, date, imagePath, personRol) => {
        let person = this.#videoSystem.getActor(personName, personLastname1, personLastname2, personDNI, date, imagePath, personRol); // ES-es Da igual el factory que usamos, ya que ambos son personas y necesitan el rol
        try {
            if (personRol == "actor") {
                this.#videoSystem.addActor(person);
            } else if (personRol == "director") {
                this.#videoSystem.addDirector(person);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    handleRemovePerson = (persons) => {
        for (let person of persons) {
            try {
                let deletePerson;
                let data = person.split("/");
                if (data[1] == "actor") {
                    deletePerson = this.#videoSystem.getActorByDNI(data[0]);
                    this.#videoSystem.removeActor(deletePerson.actor);
                } else {
                    deletePerson = this.#videoSystem.getDirectorByDNI(data[0]);
                    this.#videoSystem.removeDirector(deletePerson.director);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    handleReloadCloseForm = () => {
        this.handleInit();
    }
}

export default VideoSystemController;