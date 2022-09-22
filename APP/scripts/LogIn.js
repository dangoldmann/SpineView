const apiUrl = 'https://osia-api-production.up.railway.app'

document.addEventListener('DOMContentLoaded', () => {
    const btn_submit = document.getElementById("btn_submit");
    var form = document.getElementById("formLogIn");

    btn_submit.onclick = e => {
        e.preventDefault()
        var datosUsuario = new FormData(form)

        login(datosUsuario)
    }
})

async function login(formdata){
    const loginRoute = '/users/login'
    const url = apiUrl + loginRoute
  
    const user = {
      email: formdata.get('email'),
      password: formdata.get('password')
    }
  
    let res = await postRequest(url, user)
    res = await res.json()

    if(res.body.error){
      actOnError(res.body.error.message)
      console.log(errorMsg)
    }
    window.location.href = './HomePage.html'
}

async function postRequest(url, data){
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    return res
}

function actOnError(msg){
  if(msg == "User not found"){
    alert("msg");
  }

  else if(msg == "Invalid password"){
    alert(msg);
  }

  else{
    alert("Algo salio mal")
  }
}