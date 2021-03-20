const functions = require('firebase-functions');

// auth trigger (Usuario creado)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    console.log('User Created', user.email, user.uid);
});

// auth trigger (Usuario borrado)
exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log('User Deleted', user.email, user.uid);
});


/*

NO hace falta para la aplicación final

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
*/