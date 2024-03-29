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
            // let actors = actorList();
            let actors = selectedPersonList("selectActors");
            // console.log(actors);
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

        if (!this.selectProductionDelete.checkValidity() || this.selectProductionDelete.value == "") {
            isValid = false;
            showFeedBack($(this.selectProductionDelete), false);
            firstInvalidElement = this.selectProductionDelete;
        } else {
            showFeedBack($(this.selectProductionDelete), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.selectProductionDelete.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function relateProductionValidation(handler) {
    let form = document.forms.frelationProduction;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.selectProductionRelate.checkValidity() || this.selectProductionRelate.value == "") {
            isValid = false;
            showFeedBack($(this.selectProductionRelate), false);
            firstInvalidElement = this.selectProductionRelate;
        } else {
            showFeedBack($(this.selectProductionRelate), true);
        }

        if (!this.relationAssign.checkValidity()) {
            isValid = false;
            showFeedBack($(this.relationAssign), false);
            firstInvalidElement = this.relationAssign;
        } else {
            showFeedBack($(this.relationAssign), true);
        }

        if (!this.selectActorsRelate.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectActorsRelate), false);
            firstInvalidElement = this.selectActorsRelate;
        } else {
            showFeedBack($(this.selectActorsRelate), true);
        }

        if (!this.selectDirectorsRelate.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectDirectorsRelate), false);
            firstInvalidElement = this.selectDirectorsRelate;
        } else {
            showFeedBack($(this.selectDirectorsRelate), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let actors = selectedPersonList("selectActorsRelate");
            let directors = selectedPersonList("selectDirectorsRelate");
            handler(this.selectProductionRelate.value, this.relationAssign.value, actors, directors);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function NewCategoryValidation(handler) {
    let form = document.forms.fnewCategory;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.titleCat.checkValidity()) {
            isValid = false;
            showFeedBack($(this.titleCat), false);
            firstInvalidElement = this.titleCat;
        } else {
            showFeedBack($(this.titleCat), true);
        }

        if (!this.descCat.checkValidity()) {
            isValid = false;
            showFeedBack($(this.descCat), false);
            firstInvalidElement = this.descCat;
        } else {
            showFeedBack($(this.descCat), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.titleCat.value, this.descCat.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function RemoveCategoryValidation(handler) {
    let form = document.forms.fremoveCategory;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.selectRemoveCat.checkValidity() || this.selectRemoveCat.value == "") {
            isValid = false;
            showFeedBack($(this.selectRemoveCat), false);
            firstInvalidElement = this.selectRemoveCat;
        } else {
            showFeedBack($(this.selectRemoveCat), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.selectRemoveCat.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function createPersonValidation(handler){
    let form = document.forms.fcreatePerson;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.personName.checkValidity()) {
            isValid = false;
            showFeedBack($(this.personName), false);
            firstInvalidElement = this.personName;
        } else {
            showFeedBack($(this.personName), true);
        }

        if (!this.personLastname1.checkValidity()) {
            isValid = false;
            showFeedBack($(this.personLastname1), false);
            firstInvalidElement = this.personLastname1;
        } else {
            showFeedBack($(this.personLastname1), true);
        }

        if (!this.personLastname2.checkValidity()) {
            isValid = false;
            showFeedBack($(this.personLastname2), false);
            firstInvalidElement = this.personLastname2;
        } else {
            showFeedBack($(this.personLastname2), true);
        }

        if (!this.personDNI.checkValidity()) {
            isValid = false;
            showFeedBack($(this.personDNI), false);
            firstInvalidElement = this.personDNI;
        } else {
            showFeedBack($(this.personDNI), true);
        }

        if (!this.bornDate.checkValidity()) {
            isValid = false;
            showFeedBack($(this.bornDate), false);
            firstInvalidElement = this.bornDate;
        } else {
            showFeedBack($(this.bornDate), true);
        }

        if (!this.personPicture.checkValidity()) {
            isValid = false;
            showFeedBack($(this.personPicture), false);
            firstInvalidElement = this.personPicture;
        } else {
            showFeedBack($(this.personPicture), true);
        }

        if (!this.personRol.checkValidity() || this.personRol.value == "") {
            isValid = false;
            showFeedBack($(this.personRol), false);
            firstInvalidElement = this.personRol;
        } else {
            showFeedBack($(this.personRol), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let date = adjustDate(this.bornDate.value);
            let imagePath = ImagePerson();
            handler(this.personName.value, this.personLastname1.value, this.personLastname2.value, this.personDNI.value, date, imagePath, this.personRol.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function removePersonValidation(handler){
    let form = document.forms.fdeletePerson;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.selectPersonRemove.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectPersonRemove), false);
            firstInvalidElement = this.selectPersonRemove;
        } else {
            showFeedBack($(this.selectPersonRemove), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let persons = selectedPersonList("selectPersonRemove");
            handler(persons);
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function loginUserValidation(handler){
    let form = document.forms.fLoginUser;

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.userName.checkValidity()) {
            isValid = false;
            showFeedBack($(this.userName), false);
            firstInvalidElement = this.userName;
        } else {
            showFeedBack($(this.userName), true);
        }

        if (!this.passUser.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passUser), false);
            firstInvalidElement = this.passUser;
        } else {
            showFeedBack($(this.passUser), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(userName.value, passUser.value);
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

function ImageProduction() { // They only work with images that are in the project folder, organized according to their type productions in productions and people in people
    let path = "/productions/";
    var fileInput = document.getElementById('image');
    var filename = fileInput.files[0].name;
    return path + "" + filename;
}

function ImagePerson() { // They only work with images that are in the project folder, organized according to their type productions in productions and people in people
    let path = "/persons/";
    var fileInput = document.getElementById('personPicture');
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

// function actorList() {
//     let actorList = [];

//     for (let option of document.getElementById("selectActors")) {
//         if (option.selected) {
//             actorList.push(option.value);
//         }
//     }
//     return actorList;
// }


function selectedPersonList(idSelected) {
    let selectedList = [];
    for (let option of document.getElementById(idSelected)) {
        if (option.selected) {
            selectedList.push(option.value);
        }
    }
    return selectedList;
}
export { showFeedBack, defaultCheckElement, newProductionValidation, deleteProductionValidation, relateProductionValidation, NewCategoryValidation, RemoveCategoryValidation,
    createPersonValidation, removePersonValidation,loginUserValidation
};