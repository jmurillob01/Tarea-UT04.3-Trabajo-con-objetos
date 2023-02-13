"use strict";

class VideoSystemView {

    constructor() {
        this.main = document.getElementById('main');
        this.categories = document.getElementById('categories');
        this.menu = document.getElementById('navbar');
    }

    showCategories(categories) {
        let categoriesFather = document.getElementById("categories");

        let childCategories = document.getElementById("category-list");
        if(childCategories != null){ // Exist child
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