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
        let main = document.getElementById("main");
        let productionsFather = document.getElementById("productions");

        // let childProductions = document.getElementById("productions-list");
        // if (childProductions != null) { // Exist child
        //     productionsFather.removeChild(childProductions);
        // }

        // this.emptyMainElements();

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
        container.className = ("container my3");

        let header = document.createElement("h1");
        header.innerHTML = (category);

        let containerChild = document.createElement("div");
        containerChild.id = ("row");

        containerChild.appendChild(header);
        for (let production of productions) {
            let div = document.createElement("div");
            div.innerHTML = (`
            <div class="col-md-4">
                <figure class="card card-lg card-production" data-title="${production.title}">
                    <a data-title="${production.title}" href="#single-product" class="imgwrap">
                        <img class="${production.constructor.name}-style" src="../img/${production.image}">
                    </a>
                     <figcaption class="info-wrap">
                        <div class="row">
                            <div class="col-md-8">
                                <a data-title="${production.title}" href="#singleproduct" class="title">${production.title}</a>
                            </div>
                             <div class="col-md-4">
                                <div class="rating text-right">
                                    <i class="fa fastar"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                             </div>
                         </div>
                     </figcaption>
                     <div class="bottom-wrap">
                        <a href="#" data-title="${production.title}" class="btn btn-primary floatright"> Información </a>
                     </div>
                 </figure>
             </div>`);

            containerChild.appendChild(div);
        }
        container.appendChild(containerChild);
        this.main.appendChild(container);
    }

    listProductionInformation(production, casting) {
        this.emptyMainElements();

        let container = document.createElement("div");
        container.id = ("production-info");
        container.className = ("container my3");

        // let containerChild = document.createElement("div");
        // containerChild.id = ("row");

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
                        <td>${production.synopsys}</td>
                        <td>${production.publication}</td>
                        <td>${production.nacionality}</td>
                    </tr>
                </tbody>
                </table>
            `);


        for (let actor of casting) {
            let containerChild = document.createElement("div");
            containerChild.id = ("row");
            containerChild.innerHTML = (`
            <div class="card" style="width: 18rem;">
                <img src="../img/${actor.actor.picture}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${actor.actor.name} ${actor.actor.lastname1}</p>
                </div>
            </div>
            `);

            container.appendChild(containerChild);
        }


        // container.appendChild(containerChild);
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