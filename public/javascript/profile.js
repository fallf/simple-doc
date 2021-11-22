

async function patientAppHandler(event){
   event.preventDefault();
   const container = document.querySelector('#newText');
    const p_name = document.querySelector('#p-name').value.trim();
    const p_lname = document.querySelector('#p-lname').value.trim();
    const p_email = document.querySelector('#p-email').value.trim();
    const p_dob = document.querySelector('#p-dob').value.trim();
    const p_condition = document.querySelector('#p-sym').value.trim();
    const user_id = document.querySelector('#as-doc-id').value.trim();
    // const user_id = parseInt(user_id_string);


    if (p_name && p_lname && p_email && p_dob && p_condition && user_id){
       const response = await fetch('/api/patient',{
           method:'post',
           body:JSON.stringify({
            p_name,
            p_lname,
            p_email,
            p_dob,
            p_condition,
            user_id
           }),
           headers:{'Content-Type':'application/json'}
       });
       if(response.ok){
           console.log(response);
           console.log('success');
        //    alert('Success, You have Created a new Patient')
           const validName = document.querySelector('#p-name');
           const validLname = document.querySelector('#p-lname');
           const validEmail = document.querySelector('#p-email');
           validName.setAttribute('class','form-control is-valid');
           validLname.setAttribute('class', 'form-control is-valid');
           validEmail.setAttribute('class','form-control is-valid');
           
           document.location.replace('/profile');
           
       } else{    
        //    alert(response.statusText);
           const validEmail = document.querySelector('#p-email');
           validEmail.setAttribute('class','form-control is-invalid');
       }
    }
};


document.querySelector('#btn').addEventListener('click', patientAppHandler);
