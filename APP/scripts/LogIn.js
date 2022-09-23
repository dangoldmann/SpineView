const apiUrl = 'https://osia-api-production.up.railway.app'
//const apiUrl = 'http://localhost:3000'

var lbl_email = document.getElementById("email")
var txt_field_email = document.getElementById("txt_field_email")
var txt_field_pwd = document.getElementById("pwd")

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
    console.log(res.body)

    document.cookie = `token=${res.body.token}; max-age=86400;`
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
    alert("No existe una cuenta con ese mail. Porfavor, cree una cuenta");
    txt_email.classList.add("thisIsWrong")
    txt_field_email.classList.add("thisIsWrong")
    txt_email.innerHTML=("Usuario no encontrado")
  }

  else if(msg == "Invalid password"){
    alert("La contraseña es incorrecta");
    txt_field_pwd.classList.add("thisIsWrong")
    txt_field_pwd.innerHTML=("Contraseña incorrecta")
  }

  else{
    alert("Algo salio mal")
  }
}