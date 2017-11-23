var form = document.getElementById('login-form');
var email = document.getElementById('email');
var password = document.getElementById('password');
var loginError = document.getElementById('login-error');

var auth = firebase.auth();

function setLoginError(message) {
	loginError.textContent = message + " (page refreshes in 5 seconds) :)";
	loginError.classList.add('active');
	setTimeout(function () {
       window.location.href = "index.html";
    }, 5000);
}

form.addEventListener('submit', function(e) {
	e.preventDefault();
	email = email.value;
	password = password.value;

	if (!email || !password) {
		setLoginError('Email and password are required!');
	}

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(user) {
		return user;
	})
	.catch(function(error) {
		if (email == "" || password == "") {
			setLoginError("Did you forget to input your email and/or password?");
		} else {
			setLoginError(error.message);
		}
	});

});

var signUpForm = document.getElementById('signup-form');
var displayNameInput = document.getElementById('signup-name');
var signUpEmailInput = document.getElementById('signup-email');
var signUpPasswordInput = document.getElementById('signup-password');
var signUpPasswordConfirmInput = document.getElementById('signup-password-confirm');
var signUpButton = document.getElementById('signup-button');
var signUpError = document.getElementById('signup-error');

function setSignUpError(message) {
	signUpError.textContent = message + " (page refreshes in 5 seconds) :)";
	signUpError.classList.add('active');
	setTimeout(function () {
       window.location.href = "index.html";
    }, 5000);
}

var isSigningUp = false;

function clearSignUpError() {
	signUpError.textContent = "";
	signUpError.classList.remove('active');
}

signUpForm.addEventListener('submit', function(e) {
	e.preventDefault();
	clearSignUpError();
	var email = signUpEmailInput.value;
	var password = signUpPasswordInput.value;
	var passwordConfirm = signUpPasswordConfirmInput.value;
	isSigningUp = true;

	if (!email) {
		setSignUpError('Email is required!');
	} else if (password !== passwordConfirm) {
		setSignUpError('Passwords do not match!');
	} else {
		auth.createUserWithEmailAndPassword(email, password)
		.then(function(user) {
			return user.updateProfile({
				displayName: displayNameInput.value,
				photoURL: "https://www.gravatar.com/avatar/" + md5(email) + "?r=pg"
			})
			.then(function() {	
				return user.sendEmailVerification();
			})
			.then(function() {
				window.location.href = 'chat.html';
			})
			.catch(function(error) {
				setSignUpError(error.message);

			});			
		})
		.catch(function(error) {
			setSignUpError(error.message + " :)");
		});
	}
})

auth.onAuthStateChanged(function(user) {
	if (user && !isSigningUp) {
		window.location.href = 'chat.html';
	} else {}
});
