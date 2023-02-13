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

        let childCategories = document.getElementById("category-list");
        if (childCategories != null) { // Exist child
            categoriesFather.removeChild(childCategories);
        }

        let container = document.createElement("div");
        container.id = "category-list";
        container.className = "row";

        for (let category of categories) {
            let categoryDiv = document.createElement("div");
            categoryDiv.className = "col-lg-4 col-md-5 mt-5";

            categoryDiv.innerHTML = `
				<a datacategory="${category.name}" href="#product-list">
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
        //if (!category.done) shopping
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

        let childProductions = document.getElementById("productions-list");
        if (childProductions != null) { // Exist child
            productionsFather.removeChild(childProductions);
        }


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

    bindInit(handler) {
        // $('#init').click((event) => {
        // 	handler();
        // });

        // Faltaría borrar lo que hay puesto para que no se duplique
        document.getElementById("logo").addEventListener("click", function () {
            handler();
        });
    }
}

export default VideoSystemView;