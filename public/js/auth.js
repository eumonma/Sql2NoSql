const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');

const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// Toggle auth modals
authSwitchLinks.forEach(link =>{
    link.addEventListener('click', () =>{
        authModals.forEach(modal => modal.classList.toggle('active'));
    });
});

// Regiter Form
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // No refresca la pantalla cuando se hace Submit

    const email = registerForm.email.value;
    const password = registerForm.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log('Registered', user);
            registerForm.reset(); // Limpia los datos
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            registerForm.querySelector('.error').textContent = errorMessage;
          });
})

// Login Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // No refresca la pantalla cuando se hace Submit

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log('Logged in', user);
            loginForm.reset(); // Limpia los datos
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            loginForm.querySelector('.error').textContent = errorMessage;
          });
})

// Auth Listener
firebase.auth().onAuthStateChanged((user) => {

    console.log('Entro');

    if (user) { // Si hay usuario es que está logado
        authWrapper.classList.remove('open');
        authModals.forEach(modal => modal.classList.remove('active'));
    } else { // Si el usuario es null, es que no está logado
        authWrapper.classList.add('open');
        authModals[0].classList.add('active'); // es la primera modal, que es el Login
    }
});
