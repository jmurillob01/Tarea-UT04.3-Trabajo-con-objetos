"use strict";

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
        let ul = document.getElementById("navBar-menu");
        let li = document.createElement("li");

        li.className = "nav-item dropdown";
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
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="..." data-title="${production.title}">
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
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="..." data-title="${production.title}">
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
                <img src="../img/${actor.actor.picture}" class="card-img-top person-img" alt="..." data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">
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
                <img src="../img/${director.director.picture}" class="card-img-top person-img" alt="..." data-dni="${director.director.dni}" data-rol="${director.director.rol}">
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
                <img src="../img/${actor.actor.picture}" class="card-img-top person-img" alt="..." data-dni="${actor.actor.dni}" data-rol="${actor.actor.rol}">
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
                <img src="../img/${director.director.picture}" class="card-img-top person-img" alt="..." data-dni="${director.director.dni}" data-rol="${director.director.rol}">
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
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="..." data-title="${production.title}">
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
                <img src="../img/${person.picture}" class="card-img-top person-img" alt="..." data-dni="${person.dni}" data-rol="${person.rol}">
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

    showFormsModals(directors, actors, categories) {
        this.newProductionModal(directors, actors, categories);
        console.log("Cargado formulario");
    }
    // ES-es Cambiar para usar como Pablo en las prácticas, no usar una sola función
    newProductionModal(directors, actors, categories) {
        let containerFather = document.getElementById("modals");
        let container = document.createElement("div");

        container.innerHTML = (`
        <div class="modal fade" id="newProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Producciones</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
            <!--Formulario -->
            <form class="row g-3 needs-validation" role="form" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Título</label>
                    <input type="text" class="form-control" id="validationTooltip01" required >
                    <div class="invalid-tooltip">
                        Nombre no válido
                    </div>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Fecha de publicación</label>
                    <input type="date" class="form-control" id="validationTooltip01" required >
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">Nacionalidad</label>
                    <input type="date" class="form-control" id="validationTooltip01" required>
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-8 position-relative">
                    <label for="validationTooltip01" class="form-label">Imagen</label>
                    <input type="file" class="form-control" id="validationTooltip01" required>
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="validationTooltipUsername" class="form-label">Synopsis</label>
                    <div class="input-group require-validation">
                        <textarea rows="10" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required></textarea>
                        <div class="invalid-tooltip">
                            Please choose a unique and valid username.
                        </div>
                        <div class="valid-tooltip">
                        Looks good!
                    </div>
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">Director Principal</label>
                    <select name="selectDirectors" id="selectDirectors" class="form-select" aria-label="select example"></select>
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-8 position-relative">
                    <label for="validationTooltip01" class="form-label">Categorias</label>
                    <select name="selectCategories" id="selectCategories" class="form-select" multiple aria-label="multiple select example"></select>
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-md-12 position-relative">
                    <label for="validationTooltip01" class="form-label">Actores</label>
                    <select name="selectActors" id="selectActors" class="form-select" multiple aria-label="multiple select example"></select>
                    <div class="invalid-tooltip">
                        Fecha no válida
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Crear</button>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Understood</button>
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
            option.name = director.dni;
            option.append(director.name + " " + director.lastname1);
            selectDirectors.appendChild(option);
        }

        for (let actor of actors) {
            let option = document.createElement("option");
            option.name = actor.dni;
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

    bindInit(handler) {

        // $('#logo').click((event) => {
        // 	this.#executeHandler(handler, [], 'body', { action: 'logo' }, '#', event);
        // });

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
        let categoryListNav = document.getElementsByClassName('category-dropdown-item'); // ES-es He cambiado el nombre de la clase para que no interfiera con los formularios

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

    bindCloseWindows(handler) {
        let closeButton = document.getElementById("nav-closeWindows");
        closeButton.addEventListener("click", (event) => {
            handler(this.productionWindow)
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

    // bindFormListInMenu(handler){
    //     let formList = document.getElementsByClassName("form-dropdown-item");

    //     for (let formItem of formList) {
    //         formItem.addEventListener("click", (event) =>{
    //             handler(event.target.id);
    //             console.log(event.target.id);
    //         });

    //     }
    // }

    bindFormMenu(hCreateProduction) { // ES-es Relacionamos los botones de los formularios con sus validaciones
        let newProductionLink = document.getElementById("newProductionLink");
        newProductionLink.addEventListener("click", (event) => {
            // this.#executeHandler(hCreateProduction, [], '#new-production', { action: 'newCategory' }, '#', event);
            hCreateProduction();
        });
    }

    bindNewProductionForm(handler){
        newProductionValidation(handler);
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
}

export default VideoSystemView;