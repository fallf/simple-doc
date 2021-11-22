async function settingHandler(event){
    event.preventDefault();
  const name = document.querySelector('#upName').value.trim();
  const username = document.querySelector('#userName').value.trim();
  const last_name = document.querySelector('#upLname').value.trim();
  const email = document.querySelector('#upEmail').value.trim();
  const password = document.querySelector('#upPassword').value.trim();
  const docRole = document.querySelector('#doc-role');
  const nurRole = document.querySelector('#nur-role');
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  if(docRole.checked) {
    var role_id = docRole.value
  } else if (nurRole.checked) {
    var role_id = nurRole.value
  }
  if (name && username && last_name && email && password && role_id){
      const response = await fetch (`/api/user/${id}`,{
          method:'PUT',
          body:JSON.stringify({
              name,
              username,
              last_name,
               email,
               password,
               role_id
          }),
          headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok){
          alert('You have Updated your Profile')
          document.location.reload();
      }else {
          alert(response.statusText);
      }
  }
};
// function sendNotification(){
// }




async function deleteHandler(event){
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];


  event.preventDefault()
  confirm("Are you sure you want to delete this user?")
  if (confirm) {
    await fetch (`/api/user/${id}`,{
      method:'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    document.location.replace('/login');
  }
}


document.querySelector('#btn').addEventListener('click', settingHandler);
document.querySelector('#del-btn').addEventListener('click', deleteHandler);

