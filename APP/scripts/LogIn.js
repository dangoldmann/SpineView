import {apiUrl} from './config.js'
import {postRequestForAuthentication} from './http_requests.js'
import {isLoggedIn} from './tokens.js'

var lbl_email = document.getElementById("email")
var txt_field_email = document.getElementById("txt_field_email")
var txt_field_pwd = document.getElementById("pwd")

document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn()  
    const btn_submit = document.getElementById("btn_submit");
    var form = document.getElementById("formLogIn");

    btn_submit.onclick = e => {
        e.preventDefault()
        var datosUsuario = new FormData(form)

        login(datosUsuario)
    }
})

async function login(formdata){
  const url = apiUrl + '/auth/login'

  const user = {
    email: formdata.get('email'),
    password: formdata.get('password')
  }

  const res = await postRequestForAuthentication(url, user)
  
  if(res.error) return actOnError(res.error.message)
  
  localStorage.setItem('accessToken', res.access_token)
  
  window.location.href = './HomePage.html'
}

function actOnError(msg){
  if(msg == "User not found"){
    alert("No existe una cuenta con ese mail. Porfavor, cree una cuenta.");
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

export {isLoggedIn}