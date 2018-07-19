// Init Auth
const auth = new Auth();
// Init UI
const ui = new UI();

// Init elements
const form = document.forms['register-form'];
const email = form.elements['email'];
const password = form.elements['password'];

// Events
form.addEventListener('submit', onRegister);

//Event handlers
function onRegister(e) {
 e.preventDefault();

   if (email.value && password.value) {
     auth.register(email.value, password.value)
     .then(() => window.location = 'login-start.html')
     .catch((error) => {
       ui.showError(error.message);
     });
   }
}