"use strict";

import {
    showFeedBack, defaultCheckElement, newProductionValidation, deleteProductionValidation, relateProductionValidation, NewCategoryValidation, RemoveCategoryValidation,
    createPersonValidation, removePersonValidation, loginUserValidation
} from "./validation.js";

class VideoSystemView {

    // #windows = [];
    #windows = new Map();

    // This is done with JQuery, if it doesn't work switch to DOM
    #executeHandler(handler, handlerArguments, scrollElement, data, url, event) {
        if (typeof handlerArguments == "object") {
            handler(handlerArguments[0], handlerArguments[1]);
        } else {
            handler(handlerArguments);
        }

        // handler(...handlerArguments); Si pongo los ... da error
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    constructor() {
        this.main = document.getElementById('main');
        this.categories = document.getElementById('categories');
        this.menu = document.getElementById('navbar');
    }

    get windows() {
        return this.#windows;
    }

    showCategories(categories) {
        this.emptyMainElements();

        let container = document.createElement("div");
        container.id = "category-list";
        container.className = "row";

        for (let category of categories) {
            let categoryDiv = document.createElement("div");
            categoryDiv.className = "col-lg-4 col-md-5 mt-5";

            categoryDiv.innerHTML = `
				<a data-category="${category.name}" href="#category-list" class="a-categories">
					<div class="cat-list-image">
                        <img class="img-fluid" alt="${category.name}" src="../img/fantasyCategory.jpg" data-category="${category.name}" />
					</div>
					<div class="cat-list-text text-center" data-category="${category.name}">
						<h3 data-category="${category.name}">${category.name}</h3>
						<div>${category.description}</div>
					</div>
				</a>`;

            container.appendChild(categoryDiv);
        }
        this.categories.appendChild(container);
    }

    showCategoriesInMenu(categories) {
        this.deleteCategoriesNav();

        let ul = document.getElementById("navBar-menu");
        let li = document.createElement("li");

        li.className = "nav-item dropdown ";
        li.id = "categories-dropdown";
        li.innerHTML = (`
        <a class="nav-link dropdown-toggle" href="#category-list" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
        </a>`);

        let ulCategories = document.createElement("ul");
        ulCategories.className = ("dropdown-menu");
        for (let category of categories) {
            let liCategories = document.createElement("li");
            liCategories.innerHTML = `
            <a data-category="${category.name}" class="dropdown-item category-dropdown-item" href="#category-list">
                ${category.name}
            </a>`;
            ulCategories.appendChild(liCategories);
        }
        li.appendChild(ulCategories);
        ul.appendChild(li);
    }

    // Show randoms productions in the home menu
    showProductions(randomNumbers, productions) {
        let productionsFather = document.getElementById("productions");

        let container = document.createElement("div");
        container.id = "productions-list";
        container.className = "row d-flex";

        let count = 0;
        for (let production of productions) {
            if (randomNumbers.includes(count)) {
                let productionDiv = document.createElement("div");
                productionDiv.style.display = "flex";
                productionDiv.style.justifyContent = "center";

                productionDiv.className = "col-lg-4 col-md-5 mt-5";

                productionDiv.innerHTML = `
				
                <div class="card card-production" data-title="${production.title}" style="width: 18rem;"> <a href="#production-info">
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="${production.image}" data-title="${production.title}">
                    <div class="card-body" data-title="${production.title}">
                        <p class="card-text" data-title="${production.title}">${production.title}</p>
                    </div>
                    </a>
                 </div>
                `;
                container.appendChild(productionDiv);
            }
            count++;
        }
        productionsFather.appendChild(container);
    }

    // List productions from a category
    listProductions(productions, category) {
        this.emptyMainElements();
        let container = document.createElement("div");
        container.id = ("production-list");
        container.className = "container my3";


        let header = document.createElement("h2");
        header.className = ("mt-5");
        header.innerHTML = (category);

        let containerChild = document.createElement("div");
        containerChild.className = ("container-row d-flex");
        containerChild.style.justifyContent = "center";

        container.appendChild(header);
        for (let production of productions) {
            let div = document.createElement("div");
            div.innerHTML = (`
            <div class="col-md-4"> <a href="#production-info">
                <div class="card card-production" data-title="${production.title}" style="width: 18rem;">
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="${production.image}" data-title="${production.title}">
                    <div class="card-body" data-title="${production.title}">
                        <p class="card-text" data-title="${production.title}">${production.title}</p>
                    </div>
                </div>
                </a>
             </div>`);

            containerChild.appendChild(div);
        }
        container.appendChild(containerChild);
        this.main.appendChild(container);
    }

    // Productions information
    listProductionInformation(production, casting, directors, category) {
        this.emptyMainElements();
        let container = document.createElement("div");
        container.id = ("production-info");
        container.className = ("container my3");

        container.innerHTML = (`
            <table class="table table-secondary table-bordered mt-5">
                <thead>
                    <tr>
                    <th class="table-secondary" scope="col">Título</th>
                    <th class="table-secondary" scope="col">Synopsis</th>
                    <th class="table-secondary" scope="col">Publicación</th>
                    <th class="table-secondary" scope="col">Origen</th>
                    <th class="table-secondary" scope="col">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${production.title}</td>
                        <td>${production.synopsis}</td>
                        <td>${production.publication}</td>
                        <td>${production.nacionality}</td>
                        <td>${category}</td>
                    </tr>
                </tbody>
            </table>

            <button type="button" data-title="${production.title}" id="b-open" class="btn btn-dark">Abrir en nueva ventana</button>
            `);

        // Actors
        let containerChildActors = document.createElement("div");
        containerChildActors.className = ("container-row d-flex");
        containerChildActors.style.justifyContent = "center";

        let headerActor = document.createElement("h2");
        headerActor.className = ("mt-5 text-center");
        headerActor.innerHTML = ("Actores");
        container.appendChild(headerActor);

        for (let actor of casting) {
            let containerActor = document.createElement("div");
            containerActor.innerHTML = (`
            <div class="card person-production" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}" style="width: 18rem;">
                <a href="#actor-info">
                <img src="../img/${actor.actor.picture}" class="card-img-top person-img" alt="${actor.actor.picture}" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">
                <div class="card-body" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">
                    <p class="card-text" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">${actor.actor.name} ${actor.actor.lastname1}</p>
                </div>
                </a>
            </div>
            `);
            containerChildActors.appendChild(containerActor);
        }
        container.appendChild(containerChildActors);

        // Directors
        let containerChildDirectors = document.createElement("div");
        containerChildDirectors.className = ("container-row d-flex");
        containerChildDirectors.style.justifyContent = "center";

        let headerDirector = document.createElement("h2");
        headerDirector.className = ("mt-5 text-center");
        headerDirector.innerHTML = ("Directores");
        container.appendChild(headerDirector);

        for (let director of directors) {
            try {
                let containerDirector = document.createElement("div");
                containerDirector.innerHTML = (`
            <div class="card person-production" data-dni="${director.director.dni}" data-rol="${director.director.rol}" style="width: 18rem;">
            <a href="#director-info">
                <img src="../img/${director.director.picture}" class="card-img-top person-img" alt="${director.director.picture}" data-dni="${director.director.dni}" data-rol="${director.director.rol}">
                <div class="card-body" data-dni="${director.director.dni}" data-rol="${director.director.rol}">
                    <p class="card-text " data-dni="${director.director.dni}" data-rol="${director.director.rol}">${director.director.name} ${director.director.lastname1}</p>
                </div>
            </a>
            </div>
            `);
                containerChildDirectors.appendChild(containerDirector);
            } catch (error) {
                console.error(error.message);
            }

        }
        container.appendChild(containerChildDirectors);


        this.main.appendChild(container);
    }

    // Productions information
    listProductionInformationNewWindow(production, casting, directors, category) {
        // this.emptyMainElements();
        let main = $(this.productionWindow.document.getElementsByTagName("main"));

        let container = document.createElement("div");
        container.id = ("production-info");
        container.className = ("container my3");

        container.innerHTML = (`
            <table class="table table-secondary table-bordered mt-5">
                <thead>
                    <tr>
                    <th class="table-secondary" scope="col">Título</th>
                    <th class="table-secondary" scope="col">Synopsis</th>
                    <th class="table-secondary" scope="col">Publicación</th>
                    <th class="table-secondary" scope="col">Origen</th>
                    <th class="table-secondary" scope="col">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${production.title}</td>
                        <td>${production.synopsis}</td>
                        <td>${production.publication}</td>
                        <td>${production.nacionality}</td>
                        <td>${category}</td>
                    </tr>
                </tbody>
            </table>

            `);

        // Actors
        let containerChildActors = document.createElement("div");
        containerChildActors.className = ("container-row d-flex");
        containerChildActors.style.justifyContent = "center";

        let headerActor = document.createElement("h2");
        headerActor.className = ("mt-5 text-center");
        headerActor.innerHTML = ("Actores");
        container.appendChild(headerActor);

        for (let actor of casting) {
            let containerActor = document.createElement("div");
            containerActor.innerHTML = (`
            <div class="card person-production" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}" style="width: 18rem;">
                <a href="#actor-info">
                <img src="../img/${actor.actor.picture}" class="card-img-top person-img" alt="${actor.actor.picture}" data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">
                <div class="card-body">
                    <p class="card-text">${actor.actor.name} ${actor.actor.lastname1}</p>
                </div>
                </a>
            </div>
            `);
            containerChildActors.appendChild(containerActor);
        }
        container.appendChild(containerChildActors);

        // Directors
        let containerChildDirectors = document.createElement("div");
        containerChildDirectors.className = ("container-row d-flex");
        containerChildDirectors.style.justifyContent = "center";

        let headerDirector = document.createElement("h2");
        headerDirector.className = ("mt-5 text-center");
        headerDirector.innerHTML = ("Directores");
        container.appendChild(headerDirector);

        for (let director of directors) {
            try {
                let containerDirector = document.createElement("div");
                containerDirector.innerHTML = (`
            <div class="card person-production" data-dni="${director.director.dni}" data-rol="${director.director.rol}" style="width: 18rem;">
            <a href="#director-info">
                <img src="../img/${director.director.picture}" class="card-img-top person-img" alt="${director.director.picture}" data-dni="${director.director.dni}" data-rol="${director.director.rol}">
                <div class="card-body">
                    <p class="card-text">${director.director.name} ${director.director.lastname1}</p>
                </div>
            </a>
            </div>
            `);
                containerChildDirectors.appendChild(containerDirector);
            } catch (error) {
                console.error(error.message);
            }

        }
        container.appendChild(containerChildDirectors);


        main.append(container);
        // this.productionWindow.document.body.scrollIntoView();
    }

    // Productions from persons
    listPersonProductions(productions, actor) {
        this.emptyMainElements();
        let container = document.createElement("div");
        container.id = ("production-list");
        container.className = "container my3"

        let containerActor = document.createElement("div");
        containerActor.className = "container mb-5 d-flex justify-content-center"
        containerActor.innerHTML = (`
        <div class="card card-query mb-3 mt-5" style="max-width: 550px;">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="../img/${actor.picture}" class="img-fluid rounded-start person-img-info" alt="${actor.picture}">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                    <h5 class="card-title">${actor.name + " " + actor.lastname1}</h5>
                    <p class="card-text">Fecha de nacimiento: ${actor.born}</p>
                    <p class="card-text">Identificador: ${actor.dni}</p>
                    <p class="card-text"><small class="text-muted">Rol: ${actor.rol}</small></p>
                    </div>
                </div>
            </div>
        </div>
        `);

        container.appendChild(containerActor);

        let header = document.createElement("h2");
        header.className = ("text-center");
        header.innerHTML = ("Where to find " + actor.name + " " + actor.lastname1 + ":");

        let containerChild = document.createElement("div");
        containerChild.className = ("container-row d-flex justify-content-center");

        container.appendChild(header);
        for (let production of productions) {
            let div = document.createElement("div");
            div.innerHTML = (`
            <div class="col-md-4">
            <a href="#production-info">
                <div class="card card-production" data-title="${production.title}" style="width: 18rem;">
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="${production.image}" data-title="${production.title}">
                    <div class="card-body" data-title="${production.title}">
                        <p class="card-text" data-title="${production.title}">${production.title}</p>
                    </div>
                </div>
            </a>
            </div>`);

            containerChild.appendChild(div);
        }
        container.appendChild(containerChild);
        this.main.appendChild(container);
    }

    // List Actors and directors
    listPersons(personList, rol) {
        this.emptyMainElements();

        let container = document.createElement("div");
        container.id = ("production-list");
        container.className = "container my3";

        let containerChildPerson = document.createElement("div");
        containerChildPerson.className = ("container-row d-flex");
        containerChildPerson.style.justifyContent = "center";

        let headerPerson = document.createElement("h2");
        headerPerson.className = ("mt-5");
        headerPerson.innerHTML = (rol + "es");
        headerPerson.style.textTransform = ("Capitalize");
        container.appendChild(headerPerson);

        for (let person of personList) {
            let containerPerson = document.createElement("div");
            containerPerson.innerHTML = (`
            <div class="card person-production" data-dni="${person.dni}" data-rol="${person.rol}" style="width: 18rem;">
                <a href="#${person.rol}-info">
                <img src="../img/${person.picture}" class="card-img-top person-img" alt="${person.picture}" data-dni="${person.dni}" data-rol="${person.rol}">
                <div class="card-body" data-dni="${person.dni}" data-rol="${person.rol}">
                    <p class="card-text" data-dni="${person.dni}" data-rol="${person.rol}">${person.name} ${person.lastname1}</p>
                </div>
                </a>
            </div>
            `);
            containerChildPerson.appendChild(containerPerson);
        }
        container.appendChild(containerChildPerson);
        this.main.appendChild(container);
    }

    showLoginMain(){
        this.emptyMainElements();

        let container = document.createElement("div");
        container.className = ("container d-flex flex-column");

        let title = document.createElement("h1");
        title.className = ("mx-auto mt-3 mb-4");
        title.innerHTML = ("Inicio de Sesión");

        let containerForm = document.createElement("div");
        containerForm.className = ("d-flex justify-content-center");
        containerForm.innerHTML = (`            
            <form name="fLoginUser" class="row g-3 needs-validation" novalidate role="form">
                <div class="col-md-4 d-flex justify-content-center flex-column w-100 position-relative">
                    <label for="userName" class="form-label">Username</label>
                    <input type="text" class="form-control" id="userName" pattern="^[a-zA-Z0-9]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Nombre no válido
                    </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center flex-column w-100 mt-4 position-relative">
                    <label for="passUser" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passUser" pattern="^[a-zA-Z0-9]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Contraseña no válida
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="loginFeed">
                </div>
                <div class="d-flex justify-content-center w-100">
                    <button class="btn btn-primary w-50 mt-3" type="submit">Acceder</button>
                </div>
            </form>
            `);

        container.appendChild(title);
        container.appendChild(containerForm);
        this.main.appendChild(container);
    }

    // Method to create a list of forms in the navigation
    showFormsInMenu() {
        // Method to delete the list of forms
        this.deleteFormsNav();

        let ul = document.getElementById("navBar-menu");
        let li = document.createElement("li");

        li.className = "nav-item dropdown";
        li.id = "forms-dropdown";
        li.innerHTML = (`
            <a class="nav-link dropdown-toggle" href="#category-list" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Formularios
            </a>`);

        let ulFormsList = document.createElement("ul");
        ulFormsList.className = ("dropdown-menu");
        ulFormsList.innerHTML = (`
        <li><a id="newProductionLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#newProduction" data-form="newProduction">Nueva producción</a></li>
        <li><a id="deleteProductionLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteProduction" data-form="deleteProduction">Eliminar producción</a></li>
        <li><a id="relationsProductionLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#relationsProduction" data-form="relationsProduction">Asignar / Desasignar producciones</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a id="createCategoryLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#fcreateCategory" data-form="fcreateCategory">Crear Categoría</a></li>
        <li><a id="deleteCategoryLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#fdeleteCategory" data-form="fdeleteCategory">Eliminar Categoría</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a id="createPersonLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#fcreatePerson" data-form="fcreatePerson">Crear Persona</a></li>
        <li><a id="deletePersonLink" class="dropdown-item form-dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#fdeletePerson" data-form="fdeletePerson">Eliminar Persona</a></li>
        `);
        li.appendChild(ulFormsList);
        ul.appendChild(li);
    }

    showLoginInMenu() {
        // Method to delete the list of forms
        this.deleteLoginNav();

        let ul = document.getElementById("navBar-menu");
        let li = document.createElement("li");

        li.className = "nav-item";
        li.id = "login-nav";
        li.innerHTML = (`
            <a id="nav-login-a" class="nav-link" href="#LoginNav" role="button">
                Iniciar Sesión
            </a>`);
        ul.appendChild(li);
    }

    cookieContent(cookie){ // Call necessary cookie methods
        this.deleteGreet();
        this.deleteCloseSession();

        this.showGreet(cookie);
        this.showCloseSession();
    }

    showGreet(cookie){
        let ul = document.getElementById("navBar-menu");
        let liGreet = document.createElement("li");

        liGreet.id = "greet-li";
        liGreet.className = "nav-item nav-link";
        liGreet.innerHTML = (`
            Hola ${cookie}
        `);
        ul.appendChild(liGreet);
    }

    showCloseSession(){
        let ul = document.getElementById("navBar-menu");
        let liCloseSession = document.createElement("li");

        liCloseSession.id = "closeSession-li";
        liCloseSession.className = "nav-item";
        liCloseSession.innerHTML = (`
            <a id="closeSession-link" class="nav-link" href="#">Cerrar Sesión</a>
        `);

        ul.appendChild(liCloseSession);
    }
    

    showFormsModals(directors, actors, categories, productions, hProductionActors) {
        this.deleteFormModals();
        this.newProductionModal(directors, actors, categories);
        this.deleteProductionModal(productions);
        this.newCategoryModal();
        this.relationsProductionModal(actors, directors, productions, hProductionActors)
        this.deleteCategoryModal(categories);
        this.createPersonModal();
        this.removePersonModal(actors, directors);
    }

    newProductionModal(directors, actors, categories) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="newProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Producciones</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fNewProduction" class="row g-3 needs-validation" role="form" novalidate enctype="multipart/form-data">
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Título</label>
                    <input type="text" class="form-control" id="productionTitle" pattern="^[a-zA-Z0-9]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Nombre no válido
                    </div>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Fecha de publicación</label>
                    <input type="date" class="form-control" id="publishDate" required >
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">Nacionalidad</label>
                    <input type="text" class="form-control" id="nationality" required>
                    <div class="invalid-tooltip">
                        Nacionalidad Inválida
                    </div>
                </div>
                <div class="col-md-8 position-relative">
                    <label for="validationTooltip01" class="form-label">Imagen</label>
                    <input type="file" class="form-control" id="image" pattern=".*(png|jpg|jpeg|gif)$" required>
                    <div class="invalid-tooltip">
                        Imagen no válida
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="validationTooltipUsername" class="form-label">Synopsis</label>
                    <div class="input-group require-validation">
                        <textarea rows="10" class="form-control" id="synopsis" aria-describedby="validationTooltipUsernamePrepend" required></textarea>
                        <div class="invalid-tooltip">
                            Descripción no válida
                        </div>
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">Director Principal</label>
                    <select name="selectDirectors" id="selectDirectors" class="form-select" aria-label="select example"><option></option></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-8 position-relative">
                    <label for="validationTooltip01" class="form-label">Categorias</label>
                    <select name="selectCategories" id="selectCategories" class="form-select" aria-label="multiple select example"></select>
                    <div class="invalid-tooltip">
                    Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="validationTooltip01" class="form-label">Actores</label>
                    <select name="selectActors" id="selectActors" class="form-select" multiple aria-label="multiple select example"></select>
                    <div class="invalid-tooltip">
                    Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="relationAssign" class="form-label">Tipo de producción</label>
                    <select name="productionType" id="productionType" class="form-select" aria-label="select example">
                    <option></option>
                    <option name="serie">serie</option>
                    <option name="movie">movie</option>
                    </select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="createProductionFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Crear</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);
        let selectDirectors = document.getElementById("selectDirectors");
        let selectActors = document.getElementById("selectActors");
        let selectCategories = document.getElementById("selectCategories");

        for (let director of directors) {
            let option = document.createElement("option");
            option.value = director.dni;
            option.append(director.name + " " + director.lastname1);
            selectDirectors.appendChild(option);
        }

        for (let actor of actors) {
            let option = document.createElement("option");
            option.value = actor.dni;
            option.append(actor.name + " " + actor.lastname1);
            selectActors.appendChild(option);
        }

        for (let category of categories) {
            let option = document.createElement("option");
            option.name = category.name;
            option.append(category.name);
            selectCategories.appendChild(option);
        }
    }

    deleteProductionModal(productions) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="deleteProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminar Producciones</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fDeleteProduction" class="row g-3 needs-validation" novalidate role="form">
                <div class="col-md-12 position-relative">
                    <label for="validationTooltip01" class="form-label">Producción</label>
                    <select name="selectProductionDelete" id="selectProductionDelete" class="form-select" aria-label="select example"><option></option></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="deleteProductionFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Eliminar</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);
        let selectProduccion = document.getElementById("selectProductionDelete");

        for (let production of productions) {
            let option = document.createElement("option");
            option.value = production.title;
            option.append(production.title);
            selectProduccion.appendChild(option);
        }
    }

    relationsProductionModal(actors, directors, productions, hProductionActors) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="relationsProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Relaciones de Producciones</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="frelationProduction" class="row g-3 needs-validation" novalidate role="form">
                <div class="col-md-12 position-relative">
                    <label for="validationTooltip01" class="form-label">Producción</label>
                    <select name="selectProductionRelate" id="selectProductionRelate" class="form-select" aria-label="select example"><option></option></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="relationAssign" class="form-label">Producción</label>
                    <select name="relationAssign" id="relationAssign" class="form-select" aria-label="select example">
                    <option></option>
                    <option name="assign">assign</option>
                    <option name="desassign">desassign</option>
                    </select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                 <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Actores</label>
                    <select name="selectActorsRelate" id="selectActorsRelate" class="form-select" multiple aria-label="multiple select example"></select>
                    <div class="invalid-tooltip">
                    Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Directores</label>
                    <select name="selectDirectorsRelate" id="selectDirectorsRelate" class="form-select" multiple aria-label="select example"></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Actualizar relación</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);

        let selectProduccion = document.getElementById("selectProductionRelate"); // select productions
        for (let production of productions) {
            let option = document.createElement("option");
            option.value = production.title;
            option.append(production.title);
            selectProduccion.appendChild(option);
        }
        selectProduccion.addEventListener("change", (event) => {
            document.getElementById("relationAssign").value = "";

            this.emptyChildsSelect(["selectActorsRelate", "selectDirectorsRelate"]);
        });

        let selectAssign = document.getElementById("relationAssign");
        selectAssign.addEventListener("change", (event) => {
            let production = document.getElementById("selectProductionRelate");
            if (production.value != "") {
                if (selectAssign.value == "assign") {
                    // Add actors
                    this.assignPersons(production.value, actors, directors, hProductionActors);
                } else if (selectAssign.value == "desassign") {
                    // Add directors
                    this.desAssignPersons(production.value, actors, directors, hProductionActors);
                } else {
                    this.emptyChildsSelect(["selectActorsRelate", "selectDirectorsRelate"]);
                }
            } else {
                radio.checked = false;
                this.emptyChildsSelect(["selectActorsRelate", "selectDirectorsRelate"]);
            }
        });
    }

    newCategoryModal() {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="fcreateCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Categoría</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fnewCategory" class="row g-3 needs-validation" novalidate role="form">
                <div class="col-md-12 position-relative">
                    <label for="titleCat" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="titleCat" pattern="^[a-zA-Z0-9áéíóú]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Nombre no válido
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="descCat" class="form-label">Descripción de la categoría</label>
                    <textarea rows="10" type="text" class="form-control" id="descCat" required></textarea>
                    <div class="invalid-tooltip">
                        Descripción no válida
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="createCategoryFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Crear</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);

    }

    deleteCategoryModal(categories) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="fdeleteCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminar Categoría</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fremoveCategory" class="row g-3 needs-validation" novalidate role="form">
                <div class="col-md-12 position-relative">
                    <label for="validationTooltip01" class="form-label">Categorías</label>
                    <select name="selectRemoveCat" id="selectRemoveCat" class="form-select" aria-label="select example"><option></option></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="deleteCategoryFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Borrar</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);

        let selectRemoveCategory = document.getElementById("selectRemoveCat"); //Select de producciones
        for (let category of categories) {
            let option = document.createElement("option");
            option.value = category.name;
            option.append(category.name);
            selectRemoveCategory.appendChild(option);
        }
    }

    createPersonModal() {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="fcreatePerson" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Persona</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fcreatePerson" class="row g-3 needs-validation" novalidate role="form" enctype="multipart/form-data">
                <div class="col-md-4 position-relative">
                    <label for="personName" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="personName" pattern="^[a-zA-Z]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Nombre no válido
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="personLastname1" class="form-label">Apellido1</label>
                    <input type="text" class="form-control" id="personLastname1" pattern="^[a-zA-Z]{1,20}$" required>
                    <div class="invalid-tooltip">
                        Apellido1 no válido
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="personLastname2" class="form-label">Apellido2</label>
                    <input type="text" class="form-control" id="personLastname2">
                    <div class="invalid-tooltip">
                        Apellido2 no válido
                    </div>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="bornDate" class="form-label">Fecha de nacimiento</label>
                    <input type="date" class="form-control" id="bornDate" required >
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="personDNI" class="form-label">DNI</label>
                    <input type="text" class="form-control" id="personDNI" pattern="^[0-9]{8}[A-Za-z]{1}$" required>
                    <div class="invalid-tooltip">
                        DNI no válido
                    </div>
                </div>
                <div class="col-md-8 position-relative">
                    <label for="personPicture" class="form-label">Imagen</label>
                    <input type="file" class="form-control" id="personPicture" required pattern=".*(png|jpg|jpeg|gif)$">
                    <div class="invalid-tooltip">
                        Imagen no válida
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="personRol" class="form-label">Rol</label>
                    <select name="personRol" id="personRol" class="form-select" aria-label="select example">
                    <option></option>
                    <option name="actor">actor</option>
                    <option name="director">director</option>
                    </select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="createPersonFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Crear Persona</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);

    }

    removePersonModal(actors, directors) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="fdeletePerson" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Persona</h5>
              <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form name="fdeletePerson" class="row g-3 needs-validation" novalidate role="form" enctype="multipart/form-data">
                <div class="col-md-12 position-relative">
                    <label for="selectPersonRemove" class="form-label">Personas</label>
                    <select name="selectPersonRemove" id="selectPersonRemove" class="form-select" multiple aria-label="select example"></select>
                    <div class="invalid-tooltip">
                        Selecciona datos válidos
                    </div>
                </div>
                <div class="col-md-12 position-relative customFeed" id="deletePersonFeed">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Borrar Persona</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `);

        containerFather.appendChild(container);
        let selectPersonRemove = document.getElementById("selectPersonRemove"); // Select productions
        let persons = [...actors].concat([...directors])
        for (let person of persons) {
            let option = document.createElement("option");
            option.value = person.dni + "/" + person.rol;
            option.append(person.name + " " + person.lastname1);
            selectPersonRemove.appendChild(option);
        }
    }


    bindInit(handler) {
        document.getElementById("logo").addEventListener("click", (event) => {
            this.#executeHandler(handler, [], 'body', { action: 'init' }, '', event);
            // handler();
        });
    }

    // productions from categories
    bindProductionsCategoryList(handler) {
        let categoryList = document.getElementsByClassName('a-categories');

        for (let category of categoryList) {
            category.addEventListener("click", (event) => {
                this.#executeHandler(handler, event.target.dataset.category, 'body', { action: 'ProductionsCategoryList', categoryName: event.target.dataset.category }, '#category-list', event);
                // handler(this.dataset.category);
            });
        }
    }

    // Categories on the nav
    bindProductionsCategoryListInMenu(handler) {
        let categoryListNav = document.getElementsByClassName('category-dropdown-item'); // I have changed the name of the class so that it does not interfere with the forms

        for (let category of categoryListNav) {
            category.addEventListener("click", (event) => {
                this.#executeHandler(handler, event.target.dataset.category, 'body', { action: 'ProductionsCategoryListMenu', categoryName: event.target.dataset.category }, '#category-list', event);
                // handler(this.dataset.category);
            });
        }
    }

    // On click productions
    bindProductionInformation(handler) {
        let productionList = document.getElementsByClassName("card-production");

        for (let production of productionList) {
            production.addEventListener("click", (event) => {
                this.#executeHandler(handler, event.target.dataset.title, 'body', { action: 'ProductionInformation', productionTitle: event.target.dataset.title }, '#production-info', event);
                // handler(this.dataset.title);
            });
        }
    }

    // Card persons from production
    bindProductionPerson(handler) {
        let personList = document.getElementsByClassName("person-production");

        for (let person of personList) {
            person.addEventListener("click", (event) => {
                this.#executeHandler(handler, [event.target.dataset.dni, event.target.dataset.rol], 'body', { action: 'PersonInformation', personDNI: event.target.dataset.dni, personRol: event.target.dataset.rol }, `#${event.target.dataset.rol}-info`, event);
                // handler(this.dataset.dni, this.dataset.rol);
            });
        }
    }

    bindPersonsNav(handler) {
        let personMenus = document.getElementsByClassName("nav-person");

        for (let option of personMenus) {
            option.addEventListener("click", (event) => {
                option.href = `#${event.target.dataset.rol}-list`; // We have to modify the URL from here
                this.#executeHandler(handler, event.target.dataset.rol, 'body', { action: 'PersonNav', personRol: event.target.dataset.rol }, `#${event.target.dataset.rol}-list`, event);
            });
        }
    }

    bindLoginNav(handler){
        let loginMenu = document.getElementById("nav-login-a");
        loginMenu.addEventListener("click", (event) => {
            this.#executeHandler(handler, [], 'body', {action: 'LoginNav'}, '#LoginNav', event);
            // handler();
        });
    }

    bindCloseWindows(handler) {
        let closeButton = document.getElementById("nav-closeWindows");
        closeButton.addEventListener("click", (event) => {
            handler(this.productionWindow)
        });
    }

    bindCloseSession(handler){
        let closeSessionButton = document.getElementById("closeSession-link");
        closeSessionButton.addEventListener("click", (event) => {
            handler();
        });
    }

    bindShowProductInNewWindow(handler) {
        let button = document.getElementById("b-open");
        button.addEventListener("click", (event) => {

            if (!this.#windows.has(`${event.target.dataset.title}`)) {
                this.productionWindow = window.open("../public/production.html", `${event.target.dataset.title}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                this.productionWindow.addEventListener('DOMContentLoaded', () => {
                    handler(event.target.dataset.title)
                });
                this.#windows.set(`${event.target.dataset.title}`, this.productionWindow); // Add elements to the map
            } else if (this.#windows.has(`${event.target.dataset.title}`) && this.#windows.get(`${event.target.dataset.title}`).closed) {
                this.#windows.get(`${event.target.dataset.title}`).close();
                this.productionWindow = window.open("../public/production.html", `${event.target.dataset.title}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                this.productionWindow.addEventListener('DOMContentLoaded', () => {
                    handler(event.target.dataset.title)
                });
                this.#windows.set(`${event.target.dataset.title}`, this.productionWindow); // Add elements to the map
            } else {
                let windowActive = this.#windows.get(`${event.target.dataset.title}`);
                windowActive.focus();
            }
            this.productionWindow.id = `${event.target.dataset.title}`;
            this.productionWindow.class = `windows`;
        });
    }

    bindFormMenu(hCreateProduction, hdeleteProduction, hrelateProduction, hCreateCategory, hRemoveCategory, hcreatePerson, hremovePerson) { //  We relate the buttons of the forms with their validations
        let newProductionLink = document.getElementById("newProductionLink");
        newProductionLink.addEventListener("click", (event) => {
            hCreateProduction();
        });

        let deleteProductionLink = document.getElementById("deleteProductionLink");
        deleteProductionLink.addEventListener("click", (event) => {
            hdeleteProduction();
        });

        let relateProductionLink = document.getElementById("relationsProductionLink");
        relateProductionLink.addEventListener("click", (event) => {
            hrelateProduction();
        });

        let createCategoryLink = document.getElementById("createCategoryLink");
        createCategoryLink.addEventListener("click", (event) => {
            hCreateCategory();
        });

        let deleteCategoryLink = document.getElementById("deleteCategoryLink");
        deleteCategoryLink.addEventListener("click", (event) => {
            hRemoveCategory();
        });

        let createPersonLink = document.getElementById("createPersonLink");
        createPersonLink.addEventListener("click", (event) => {
            hcreatePerson();
        });

        let deletePersonLink = document.getElementById("deletePersonLink");
        deletePersonLink.addEventListener("click", (event) => {
            hremovePerson();
        });
    }

    bindNewProductionForm(handler) {
        newProductionValidation(handler);
    }

    bindDeleteProductionForm(handler) {
        deleteProductionValidation(handler);
    }

    bindRelateProductionForm(handler) {
        relateProductionValidation(handler);
    }

    bindNewCategoryForm(handler) {
        NewCategoryValidation(handler);
    }

    bindRemoveCategoryForm(handler) {
        RemoveCategoryValidation(handler);
    }

    bindCreatePersonForm(handler) {
        createPersonValidation(handler);
    }

    bindRemovePersonForm(handler) {
        removePersonValidation(handler);
    }

    bindLoginForm(handler){
        loginUserValidation(handler);
    }

    // Empty the main
    emptyMainElements() {
        let main = document.getElementById("main");
        let categories = document.getElementById('categories');
        let productionsRandom = document.getElementById('productions');

        // More elements, no principal
        if (main.childElementCount > 3) {
            while (main.childElementCount > 3) {
                main.lastElementChild.remove();
            }
        }

        while (categories.firstElementChild) {
            categories.firstElementChild.remove();
        }
        while (productionsRandom.firstElementChild) {
            productionsRandom.firstElementChild.remove();
        }
    }

    deleteFormModals() {
        let modalContainer = document.getElementById("modals");
        while (modalContainer.childElementCount > 0) {
            modalContainer.lastElementChild.remove();
        }
    }

    deleteCategoriesNav() {
        try {
            let navMenu = document.getElementById("categories-dropdown");
            let parent = navMenu.parentNode;
            parent.removeChild(navMenu);
        } catch (error) {
            // console.error(error.message);
        }
    }

    deleteFormsNav() {
        try {
            let navMenu = document.getElementById("forms-dropdown");
            let parent = navMenu.parentNode;
            parent.removeChild(navMenu);
        } catch (error) {
            // console.error(error.message);
        }
    }

    deleteLoginNav() {
        try {
            let navMenu = document.getElementById("login-nav");
            let parent = navMenu.parentNode;
            parent.removeChild(navMenu);
        } catch (error) {
            // console.error(error.message);
        }
    }

    deleteGreet(){
        try {
            let navMenu = document.getElementById("greet-li");
            let parent = navMenu.parentNode;
            parent.removeChild(navMenu);
        } catch (error) {
            // console.error(error.message);
        }
    }

    deleteCloseSession(){
        try {
            let navMenu = document.getElementById("closeSession-li");
            let parent = navMenu.parentNode;
            parent.removeChild(navMenu);
        } catch (error) {
            // console.error(error.message);
        }
    }

    reloadPageCLose(handler) {
        let modalsClose = document.getElementsByClassName("close-modal");

        for (let button of modalsClose) {
            button.addEventListener("click", (event) => {
                handler();
            })
        }
    }

    assignPersons(prodTitle, systemActors, systemDirectors, hProductionActors) { // ES-es Se pueden mover cosas entre ficheros con handler
        let selectActors = document.getElementById("selectActorsRelate");
        let selectDirectors = document.getElementById("selectDirectorsRelate");

        let personData = hProductionActors(prodTitle);

        this.emptyChildsSelect(["selectActorsRelate", "selectDirectorsRelate"]);

        for (let actor of systemActors) {
            if (!personData["castingNif"].includes(actor.dni)) { // If the actor does not belong to the production, it does not appear
                let option = document.createElement("option");
                option.value = actor.dni;
                option.append(actor.name + " " + actor.lastname1);
                selectActors.appendChild(option);
            }
        }

        for (let director of systemDirectors) {
            if (!personData["directorsNif"].includes(director.dni)) { // If the director does not belong to the production, he does not appear
                let option = document.createElement("option");
                option.value = director.dni;
                option.append(director.name + " " + director.lastname1);
                selectDirectors.appendChild(option);
            }
        }
    }

    desAssignPersons(prodTitle, systemActors, systemDirectors, hProductionActors) {
        let selectActors = document.getElementById("selectActorsRelate");
        let selectDirectors = document.getElementById("selectDirectorsRelate");

        let personData = hProductionActors(prodTitle);

        this.emptyChildsSelect(["selectActorsRelate", "selectDirectorsRelate"]);

        for (let actor of systemActors) {
            if (personData["castingNif"].includes(actor.dni)) {
                let option = document.createElement("option");
                option.value = actor.dni;
                option.append(actor.name + " " + actor.lastname1);
                selectActors.appendChild(option);
            }
        }

        for (let director of systemDirectors) {
            if (personData["directorsNif"].includes(director.dni)) {
                let option = document.createElement("option");
                option.value = director.dni;
                option.append(director.name + " " + director.lastname1);
                selectDirectors.appendChild(option);
            }
        }
    }

    emptyChildsSelect([...idList]) {
        for (let id of idList) {
            let select = document.getElementById(id);
            while (select.childElementCount > 0) {
                select.lastElementChild.remove();
            }
        }
    }
}

export default VideoSystemView;