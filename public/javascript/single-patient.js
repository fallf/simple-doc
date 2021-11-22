async function patientCommnetHandler(event) {
    event.preventDefault()
    const p_doc_comment = document.querySelector('#doc-comment').value.trim();
    const p_email = document.querySelector('#pat-email').innerText.trim();
    const p_name = document.querySelector('#pat-name').innerText.trim();
    const p_condition = document.querySelector('#pat-con').innerText.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(p_doc_comment)
      console.log(id + "Look Here")


      

    if (p_doc_comment && id && p_email && p_name && p_condition) {
        const response = await fetch(`/api/patient/${id}`, {
            method: 'PUT',
            body:JSON.stringify({
                p_doc_comment,
                p_email,
                p_name,
                p_condition
            }),
            headers: {'Content-Type':'application/json'}
        });
        if(response.ok){
            console.log(response);
            console.log('success');
            document.location.replace('/profile');
            
        } else{
            alert(response.statusText);
        }
    }
};

document.querySelector('#update-btn').addEventListener('click', patientCommnetHandler);