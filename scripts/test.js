import Person from "./Person.js";

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