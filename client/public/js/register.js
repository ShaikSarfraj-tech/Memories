const form=document.getElementById('form');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');
const mobile=document.getElementById('Mobile');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } 
  else {
           showError(input, 'Email is not valid');
  }
}

function checkmobile(input){
  const reg = /^[6-9][0-9]{9}$/
  if(reg.test(input.value.trim())){
    showSuccess(input);
  }
   
  else {
    showError(input, 'Mobile Number is not valid');

  }
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input , "Password is correct");
  }
}
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}


form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkEmail(email);
  checkLength(password, 6 , 12);
  checkLength(password2, 6 , 12);
  checkPasswordsMatch(password, password2);
  checkmobile(mobile);
});
