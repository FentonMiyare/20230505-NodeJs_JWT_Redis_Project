/*LOGSIGN UP*/
/* --color-black: #42445A; */
import AuthService from "./services/auth.service.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const signupBtn = $('#signup-toggle');
const loginBtn = $('#login-toggle');
const btnToggleLogin = $("#login-toggle");
const btnToggleSignup = $('#signup-toggle');
const loginForm = $('#login-form');
const signupForm = $('#signup-form')
const passwordInput = $('#password');
const toggle = $('#btnToggle')
const result = $("#result");
const message = $('.message');

const myLoginForm = document.forms.loginForm
const mySignupForm = document.forms.signupForm

signupBtn.addEventListener('click', toggleSignup);
loginBtn.addEventListener('click', toggleLogin)


function toggleSignup() {
  btnToggleLogin.style.backgroundColor="#fff";
  btnToggleLogin.style.color="#1A3263";
  btnToggleSignup.style.backgroundColor="#1A3263";
  btnToggleSignup.style.color="#fff";
  loginForm.style.display="none";
  signupForm.style.display="block";
    
    
  /*SHOW/HIDE PASSWORD*/
  function togglePassword() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggle.innerHTML = 'hide';
    } else {
      passwordInput.type = 'password';
      toggle.innerHTML = 'show';
    }
  }
    
  toggle.addEventListener('click', togglePassword, false);
}

function toggleLogin() {
  btnToggleLogin.style.backgroundColor="#1A3263";
  btnToggleLogin.style.color="#fff";
  btnToggleSignup.style.backgroundColor="#fff";
  btnToggleSignup.style.color="#1A3263"; //222
  loginForm.style.display="block";
  signupForm.style.display="none";
}


/* FORM VALIDATION */
class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      
      let inputErrors = self.fields.every(field => {
        const input = document.querySelector(`#${field}`);
        let error = self.validateFields(input);
        return error.length > 0
      })
      
      if(!inputErrors) {
        //console.log(username, email, password);
        this.sendData()
      }
    });
  }
  
  sendData() {
    // const XHR = new XMLHttpRequest();
    // const myFormData = new FormData(this.form);
    // // Send the data that the user has entered in the form
    
    // const { username, email, password, confirmPassword } = Object.fromEntries(myFormData.entries());
  
    // XHR.onreadystatechange = function() {
    //   // recupero id alert
    //   if (XHR.readyState === 1 || XHR.readyState === 2 || XHR.readyState === 3) {
  
    //     result.textContent = "Sending in progress...";
    //   }
  
    //   if (XHR.readyState === 4 && XHR.status === 200) {
    //     result.textContent = "Message sent!";
    //   }
    //   else if (XHR.readyState === 4 && XHR.status === 404) {
    //     result.textContent = "Fill out the form correctly!";
    //   }
    //   else if (XHR.readyState === 4 && XHR.status !== 200 || XHR.readyState === 4 && XHR.status !== 404) {
    //     message.textContent = "An error has occurred!";
    //   }
    // };
  
    // XHR.open("POST", "/api/v1/auth/signup"); // set the request to the server
    //   // The action attribute (/api/v1/auth/signup in this case), specifies where to send the form-data when a form is submitted.
    //   // On submit, the form-data is sent to a file named "/api/v1/auth/signup" (to process the input):
    // XHR.send(myFormData); // Send the data that the user has entered in the form
    // // location.assign("/api/v1/login")
    // console.log(username, email, password, confirmPassword)

    const myFormData = new FormData(this.form);
    const data = Object.fromEntries(myFormData.entries());
    const { username, email, password, confirmPassword } = data;
    
    
    AuthService.register(
        username,
        email,
        password,
        confirmPassword
      )
      
    console.log(username, email, password, confirmPassword);
    return username, email, password, confirmPassword
  }
  
  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener('input', event => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    let error = []
    // Check presence of values
    if (field.value.trim() === "") {
      try {
        this.setStatus(field, `${field.name} cannot be blank`, "error");
        error.push('blank error');
        field.focus();
        
        return 
      } catch (e) {
        console.warn(e);
      }
    } else {
      this.setStatus(field, null, "success");
    }
    
    // check for valid username
    if (field.id === "username") {
      const usernameValidationRule = /[A-Za-z0-9]{5,}/;
      if (usernameValidationRule.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Username is too short or contains special characters", "error");
        error.push('invalid username');
        field.focus();
      //  throw new Error("oops!");
      }
    }

    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Please enter valid email address", "error");
        error.push('invalid email');
        field.focus();
      }
    }
    
    // Password length
    if(field.id === "password") {
      const passwordValidationRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/g;
      let passArray = Array.from(field.value)
      // const passwordValidationRule = /^(?=.*[a-z]).{6,50}$/g;
      /*if (passwordValidationRule.test(field.value))*/
      if(passArray.length >= 6) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "The password has to be at least 6 characters long", "error");
        error.push('Missing special chars');
        field.focus();
      }
      /*
      else if (passArray.length < 6) {
        this.setStatus(field, "Password must be 6 or more characters", "error");
        error.push('password less 6 char');
        field.focus();
      }
      */
    }

    // Password confirmation edge case
    if (field.id === "password_confirmation") {
      const passwordField = this.form.querySelector('#password');

      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error");
        error.push('null password');
      } else if (field.value != passwordField.value) {
        this.setStatus(field, "Password does not match", "error");
        error.push('non matched password');
      } else {
        this.setStatus(field, null, "success");
      }
    }
    
    return error
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success');
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (status === "success") {
      if (errorIcon) {errorIcon.classList.add('hidden');}
      if (errorMessage) {errorMessage.innerText = "";}
      successIcon.classList.remove('hidden');
      field.classList.remove('input-error');
    }

    if (status === "error") {
      if (successIcon) {successIcon.classList.add('hidden');}
      field.parentElement.querySelector('.error-message').innerText = message;
      errorIcon.classList.remove('hidden');
      field.classList.add('input-error');
      field.focus();
    }
    
  }
}



const form = mySignupForm; // document.querySelector('.form');

const fields = ["username", "email", "password", "password_confirmation"];

const validator = new FormValidator(form, fields);

validator.initialize();


/* LOG IN DATA */ 
function sendLoginData(event) {
  event.preventDefault();
  
  const myFormData = new FormData(event.currentTarget);
  const data = Object.fromEntries(myFormData.entries());
  const { username, password } = data;

  console.log(username, password)
  
  AuthService.login(
    username,
    password
  )
  
  if (true) {
    const currentUser = AuthService.getCurrentUser();
      
    // console.log('Current User', currentUser)
    return currentUser
  }
  
}

myLoginForm.addEventListener('submit', sendLoginData)

/*
const values = [...myFormData.entries()];
for (let [name, value] of values) {
  alert(`${name}: ${value}`);
}
*/
