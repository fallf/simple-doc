async function userLoginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(email && password) {
    console.log(password)
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
      
      document.location.replace('/profile');
     

    } else {
      const validateEmail = document.getElementById('email-login');
      const validatePass = document.getElementById('password-login');
      validateEmail.setAttribute('class', 'input-box form-control is-invalid');
      validatePass.setAttribute('class', 'input-box form-control is-invalid');
    }
  }
}

function userSignupRoute() {
  console.log('signup clicked')
  // document.location.replace("/signup")
};

document.querySelector('#login-btn').addEventListener('click', userLoginFormHandler);
document.getElementById('user-signup').addEventListener('click', userSignupRoute);