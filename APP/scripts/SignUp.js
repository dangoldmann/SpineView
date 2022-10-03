const apiUrl = 'https://osia-api-production.up.railway.app'
//const apiUrl = 'http://localhost:3000'

var lbl_email = document.getElementById("lbl_email");

document.addEventListener("DOMContentLoaded", ()=>{
  checkCookies()

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
  const registerRoute = '/users/register'
  const url = apiUrl + registerRoute
  
  const user = {
    name: formdata.get('name'),
    surname: formdata.get('surname'),
    email: formdata.get('email'),
    phone: formdata.get('phone'),
    password: formdata.get('password')
  }

  let res = await postRequest(url, user)
  res = await res.json()

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

async function checkCookies(){
  const url = apiUrl + '/users/register'

  let res = await getRequest(url)
  res = await res.json()

  if(res.redirect){
    window.location.href = res.redirect.destination
  }
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

async function postRequest(url, data){
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return res
}

async function getRequest(url){
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  return res
}