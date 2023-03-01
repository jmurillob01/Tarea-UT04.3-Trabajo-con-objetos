function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

function newProductionValidation(handler) {
    let form = document.forms.fNewProduction;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.productionTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.productionTitle), false);
            firstInvalidElement = this.productionTitle;
        } else {
            showFeedBack($(this.productionTitle), true);
        }

        if (!this.publishDate.checkValidity()) {
            isValid = false;
            showFeedBack($(this.publishDate), false);
            firstInvalidElement = this.publishDate;
        } else {
            showFeedBack($(this.publishDate), true);
        }

        this.nationality.value = this.nationality.value.trim();
        showFeedBack($(this.nationality), true);

        if (!this.image.checkValidity()) {
            isValid = false;
            showFeedBack($(this.image), false);
            firstInvalidElement = this.image;
        } else {
            showFeedBack($(this.image), true);
        }

        this.synopsis.value = this.synopsis.value.trim();
        showFeedBack($(this.synopsis), true);

        if (!this.selectDirectors.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectDirectors), false);
            firstInvalidElement = this.selectDirectors;
        } else {
            showFeedBack($(this.selectDirectors), true);
        }

        if (!this.selectCategories.checkValidity() || this.selectCategories.value == "") {
            isValid = false;
            showFeedBack($(this.selectCategories), false);
            firstInvalidElement = this.selectCategories;
        } else {
            showFeedBack($(this.selectCategories), true);
        }

        if (!this.selectActors.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectActors), false);
            firstInvalidElement = this.selectActors;
        } else {
            showFeedBack($(this.selectActors), true);
        }

        if (!this.productionType.checkValidity()) {
            isValid = false;
            showFeedBack($(this.productionType), false);
            firstInvalidElement = this.productionType;
        } else {
            showFeedBack($(this.productionType), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let date = adjustDate(this.publishDate.value);
            let imagePath = ImageProduction();
            let categories = categoryList();
            let actors = actorList();
            handler(this.productionType.value, categories, actors, this.selectDirectors.value, this.productionTitle.value, this.nationality.value, date, this.synopsis.value, imagePath);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function deleteProductionValidation(handler) {
    let form = document.forms.fDeleteProduction;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.selectProduction.checkValidity() || this.selectProduction.value == "") {
            isValid = false;
            showFeedBack($(this.selectProduction), false);
            firstInvalidElement = this.selectProduction;
        } else {
            showFeedBack($(this.selectProduction), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.selectProduction.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function adjustDate(date) { // Method to create a correct date
    date = date.split("-");
    date = date.reverse();
    return date.join("/");
}

function ImageProduction() { // ES-es Solo funcionan con imagenes que estén en la carpeta del proyecto, organizadas según su tipo producciones en producciones y personas en personas
    let path = "/productions/";
    var fileInput = document.getElementById('image');
    var filename = fileInput.files[0].name;
    return path + "" + filename;
}

function categoryList() {
    let categoryList = [];

    for (let option of document.getElementById("selectCategories")) {
        if (option.selected) {
            categoryList.push(option.value);
        }
    }
    return categoryList;
}

function actorList() {
    let actorList = [];

    for (let option of document.getElementById("selectActors")) {
        if (option.selected) {
            actorList.push(option.value);
        }
    }
    return actorList;
}

export { showFeedBack, defaultCheckElement, newProductionValidation, deleteProductionValidation };