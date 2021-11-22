async function userSignupFormHandler(event) {
  event.preventDefault();
  const name = document.querySelector('#name-signup').value.trim();
  const last_name = document.querySelector('#lname-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const docRole = document.querySelector('#doc-role-signup');
  const nurRole = document.querySelector('#nur-role-signup');
  if(docRole.checked) {
    var role_id = docRole.value
  } else if (nurRole.checked) {
    var role_id = nurRole.value
  }
  if (name && last_name && username && email && password && role_id) {
    const response = await fetch('/api/user/', {
      method: 'post',
      body: JSON.stringify({
        name,
        last_name,
        username,
        email,
        password,
        role_id
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
        console.log('success');
        const validEmail = document.querySelector('#email-signup');
        const validName = document.querySelector('#name-signup');
        const validLname = document.querySelector('#lname-signup');
        const validUser = document.querySelector('#username-signup');
        validEmail.setAttribute('class','form-control is-valid');
        validName.setAttribute('class', 'form-control is-valid');
        validUser.setAttribute('class', 'form-control is-valid');
        validLname.setAttribute('class', 'form-control is-valid');
        document.location.replace("/login")
    } else {
      
      
        alert(response.statusText);
    }
  }
};
document.getElementById('signup-btn').addEventListener('click', userSignupFormHandler);


