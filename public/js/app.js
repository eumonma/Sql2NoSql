//const { console } = require("console");

/* Comentario */
const requestModal = document.querySelector('.new-request'); // Hace referencia al documento modal a abrir
const requestLink = document.querySelector('.add-request'); // HAce referencia al elemento sobre el que se hace Click para abrir la Modal

// open request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// para poder cerrar el modal
requestModal.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open');
    }
})



/* Se quita para la aplicación final

// say hello function call
const button = document.querySelector('.call');
button.addEventListener('click', () => {
  // get function reference
  const sayHelloFunc = firebase.functions().httpsCallable('sayHello');

  // call the function and pass data
  sayHelloFunc({ name: 'Eugenio' }).then(result => {
    console.log(result.data);
  });
});
*/
