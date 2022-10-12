import {apiUrl} from './config.js'
import {postRequest} from './http_requests.js';
import {checkCookies} from './cookies.js'

var lbl_email = document.getElementById("lbl_email");

document.addEventListener("DOMContentLoaded", ()=>{
  checkCookies('/auth/register')

  const btn_submit = document.getElementById("btn_submit");
  var form = document.getElementById("formRegistro");
  var txts_passwords = document.getElementById("pass");
  var lbl_password = document.getElementById("lblpass")

  let isComplete = dataform => {
    let arraydata = [];
    for (let el of dataform.values()){
      arraydata.push(el);
    }
    
    let result = arraydata.some((e)=>{
      if (e == ""){
        return true;
      }
      return false;
    });
    return !result;
  }

  btn_submit.onclick = e => {
    e.preventDefault();
    var datosUsuario = new FormData(form);
    
    let isPassword = pwdMatch(datosUsuario.get('password'), datosUsuario.get('ContraseniaUsuarioConfirmar'))
    
    if(!isPassword){
      alert("Las contreñas no coinciden");
      txts_passwords.classList.add("thisIsWrong");
      lbl_password.classList.add("thisIsWrong");
      lbl_email.classList.remove("thisIsWrong");
    }

    else if (isComplete(datosUsuario)){
      register(datosUsuario)
    }

    else{
      alert("Asegurate de haber completado todos los campos ");
    }
      
  }
})

async function register(formdata){
  const registerRoute = '/auth/register'
  const url = apiUrl + registerRoute
  
  const user = {
    name: formdata.get('name'),
    surname: formdata.get('surname'),
    email: formdata.get('email'),
    phone: formdata.get('phone'),
    password: formdata.get('password')
  }

  let res = await postRequest(url, user)

  if(res.error){
    actOnError(res.error.message);
    return
  }
  
  window.location.href="./HomePage.html";
}
  
function pwdMatch(contraseña, contraseña2){
  if(contraseña != contraseña2){
    return false
  }
    return true
}

function actOnError(msg){
  if(msg == "User already exists with that email adress"){
    alert(msg);
    lbl_email.classList.add("thisIsWrong")
  }

  else if(msg =="Invalid email adress"){
    alert(msg);
    lbl_email.classList.add("thisIsWrong")
  
  }

  else{
    alert(msg)
  }
}