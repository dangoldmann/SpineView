document.addEventListener("DOMContentLoaded", ()=>{
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
      txts_passwords.classList.add("passwordwrong");
      lbl_password.classList.add("passwordwrong")
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
  const url = 'http://localhost:3000/users/register'

  const user = {
    name: formdata.get('name'),
    surname: formdata.get('surname'),
    email: formdata.get('email'),
    phone: formdata.get('phone'),
    password: formdata.get('password')
  }

  let res = await postRequest(url, user)
  res = await res.json()

  if(res.body.error){
    console.log(res.body.error)
  }
  else{
    console.log(res.body.user)
  }
}
  
function pwdMatch(contraseña, contraseña2){
  if(contraseña != contraseña2){
    return false
  }
    return true
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
