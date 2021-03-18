const functions = require('firebase-functions');


// Ejemplo 1. http request
// Con una respuesta
exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
})

// Ejemplo 2. http request
// Redirecciona a otra página.
exports.toTheDojo = functions.https.onRequest((request, response) => {
    response.redirect('https://www.thenetninja.co.uk');
})

// Ejemplo 3. http Callable function
exports.sayHello = functions.https.onCall((data, context) => {
    const name = data.name;
    return `Hello, ${name}`;
})