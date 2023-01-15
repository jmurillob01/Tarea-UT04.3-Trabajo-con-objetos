import Category from "./Category.js";
import Person from "./Person.js";
import Resource from "./Resource.js";
import Production from "./Production.js";

// Complete test about person
try {
    // Creating the object
    var person1 = new Person("Javier", "Murillo","","12-12-2002","");
    console.log(person1.toString());

    // Error with Second Lastname
    person1.lastname2 = "123";
} catch (error) {
    console.log(error.message); 
}

try {
    // Error with Picture
    person1.picture = "123";
} catch (error) {
    console.log(error.message); 
}

// Complete test about Category
try {
    var category1 = new Category("Fantasy", "Lorem ipsum dolor sit amet");
    console.log(category1);

    // Error with description
    category1.description = "";
} catch (error) {
    console.log(error.message)
}

// Complete test about Resource
try {
    var resource1 = new Resource(10, "https://www.google.com");
    console.log(resource1);

    // Invalid resource
    var resource2 = new Resource(0, "");
} catch (error) {
    console.log(error.message);
}

// Complete test about Production
try {
    let product1 = new Production("Titulo", "");
} catch (error) {
    console.log(error.message);
}