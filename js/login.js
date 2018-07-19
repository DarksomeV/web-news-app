// Init Auth
const auth = new Auth();
// Init UI
const ui = new UI();

// Init elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const login = form.elements['login'];


// Check auth state
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		window.location = 'index.html';
	}
});

form.addEventListener('submit', onLogin);


function onLogin(e) {
	e.preventDefault();
	if (email.value && password.value) {
		auth.login(email.value, password.value)
		.then(() => window.location = 'index.html')
		.catch(err => {
       ui.showError(err);
       })
	}
}


