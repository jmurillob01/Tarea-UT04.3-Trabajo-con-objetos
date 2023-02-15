"use strict";

class VideoSystemView {

    constructor() {
        this.main = document.getElementById('main');
        this.categories = document.getElementById('categories');
        this.menu = document.getElementById('navbar');
    }

    showCategories(categories) {
        let main = document.getElementById("main");
        let categoriesFather = document.getElementById("categories");

        // let childCategories = document.getElementById("category-list");
        // if (childCategories != null) { // Exist child
        //     categoriesFather.removeChild(childCategories);
        // }
        this.emptyMainElements();

        let container = document.createElement("div");
        container.id = "category-list";
        container.className = "row";

        for (let category of categories) {
            let categoryDiv = document.createElement("div");
            categoryDiv.className = "col-lg-4 col-md-5 mt-5";

            categoryDiv.innerHTML = `
				<a data-category="${category.name}" href="#product-list" class="a-categories">
					<div class="cat-list-image">
                        <img class="img-fluid" alt="${category.name}" src="../img/fantasyCategory.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>${category.name}</h3>
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
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
        </a>`);

        let ulCategories = document.createElement("ul");
        ulCategories.className = ("dropdown-menu");
        for (let category of categories) {
            let liCategories = document.createElement("li");
            liCategories.innerHTML = `
            <a data-category="${category.name}" class="dropdown-item" href="#productlist">
                ${category.name}
            </a>`;
            ulCategories.appendChild(liCategories);
        }
        li.appendChild(ulCategories);
        ul.appendChild(li);
    }

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
				<div class="card" style="width: 18rem;">
                    <img src="../img/${production.image}" class="card-img-top" alt="${production.image}">
                    <div class="card-body">
                        <h5 class="">${production.title}</h5>
                        <p class="card-text">${production.synopsys}</p>
                        <a href="#" class="btn btn-primary">Más información</a>
                    </div>
                </div>
                `;

                container.appendChild(productionDiv);
            }

            count++;
        }
        productionsFather.appendChild(container);
    }

    listProductions(productions, category) {
        this.emptyMainElements();
        let container = document.createElement("div");
        container.id = ("production-list");
        container.className = "container my3";

        let header = document.createElement("h2");
        header.className = ("mt-5");
        header.innerHTML = (category);

        let containerChild = document.createElement("div");
        containerChild.className = ("container-row");

        container.appendChild(header);
        for (let production of productions) {
            let div = document.createElement("div");
            div.innerHTML = (`
            <div class="col-md-4">
                <div class="card card-production" data-title="${production.title}" style="width: 18rem;">
                    <img src="../img/${production.image}" class="card-img-top person-img" alt="...">
                    <div class="card-body">
                        <p class="card-text">${production.title}</p>
                    </div>
                </div>
             </div>`);

            containerChild.appendChild(div);
        }
        container.appendChild(containerChild);
        this.main.appendChild(container);
    }

    listProductionInformation(production, casting, directors) {
        this.emptyMainElements();

        let container = document.createElement("div");
        container.id = ("production-info");
        container.className = ("container my3");

        container.innerHTML = (`
            <table class="table table-secondary mt-5">
                <thead>
                    <tr>
                    <th class="table-secondary" scope="col">#</th>
                    <th class="table-secondary" scope="col">Título</th>
                    <th class="table-secondary" scope="col">Synopsis</th>
                    <th class="table-secondary" scope="col">Publicación</th>
                    <th class="table-secondary" scope="col">Origen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>${production.title}</td>
                        <td>${production.synopsis}</td>
                        <td>${production.publication}</td>
                        <td>${production.nacionality}</td>
                    </tr>
                </tbody>
                </table>
            `);

        // Actors
        let containerChildActors = document.createElement("div");
        containerChildActors.className = ("container-row");
        let headerActor = document.createElement("h2");
        headerActor.className = ("mt-5");
        headerActor.innerHTML = ("Actores");
        container.appendChild(headerActor);

        for (let actor of casting) {
            let containerActor = document.createElement("div");
            containerActor.innerHTML = (`
            <div class="card" style="width: 18rem;">
                <img src="../img/${actor.actor.picture}" class="card-img-top person-img" alt="...">
                <div class="card-body">
                    <p class="card-text">${actor.actor.name} ${actor.actor.lastname1}</p>
                </div>
            </div>
            `);
            containerChildActors.appendChild(containerActor);
        }
        container.appendChild(containerChildActors);

        // Directors
        let containerChildDirectors = document.createElement("div");
        containerChildDirectors.className = ("container-row");
        let headerDirector= document.createElement("h2");
        headerDirector.className = ("mt-5");
        headerDirector.innerHTML = ("Directores");
        container.appendChild(headerDirector);

        for (let director of directors) {
            let containerDirector = document.createElement("div");
            containerDirector.innerHTML = (`
            <div class="card" style="width: 18rem;">
                <img src="../img/${director.director.picture}" class="card-img-top person-img" alt="...">
                <div class="card-body">
                    <p class="card-text">${director.director.name} ${director.director.lastname1}</p>
                </div>
            </div>
            `);
            containerChildDirectors.appendChild(containerDirector);
        }
        container.appendChild(containerChildDirectors);
        
        
        this.main.appendChild(container);
    }

    bindInit(handler) {
        // $('#init').click((event) => {
        // 	handler();
        // });

        document.getElementById("logo").addEventListener("click", function () {
            handler();
        });
    }

    // Mostrar las producciones
    bindProductionsCategoryList(handler) {
        let categoryList = document.getElementsByClassName('a-categories');

        for (let category of categoryList) {
            category.addEventListener("click", function () {
                handler(this.dataset.category);
            });
        }
    }

    bindProductionsCategoryListInMenu(handler) {
        let categoryListNav = document.getElementsByClassName('dropdown-item');

        for (let category of categoryListNav) {
            category.addEventListener("click", function () {
                handler(this.dataset.category);
            });
        }
    }

    bindProductionInformation(handler) {
        let productionList = document.getElementsByClassName("card-production");

        
        for (let production of productionList) {
            production.addEventListener("click", function () {
                console.log(this.dataset.title);
                handler(this.dataset.title);
            });
        }
    }

    emptyMainElements() {
        let main = document.getElementById("main");
        let categories = document.getElementById('categories');
        let productionsRandom = document.getElementById('productions');

        // Hay más de elementos que no son los principales
        if (main.childElementCount > 2) {
            while (main.childElementCount > 2) {
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