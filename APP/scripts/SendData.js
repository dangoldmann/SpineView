document.addEventListener("DOMContentLoaded", ()=>{
  const btn_submit = document.getElementById("btn_submit");
  var form = document.getElementById("formRegistro");
  var txts_passwords = document.getElementById("pass");
  var lbl_password = document.getElementById("lblpass")

  let isComplete = (dataform)=>{
    let arraydata =[];
    for (let el of dataform.values()){
      arraydata.push(el);
    }
    
    let result = arraydata.some((e)=>{
      if (e == ""){
        return true;
      }
      return false;
    });
    console.log(arraydata)
    return !result;
  }

  btn_submit.onclick=function(e){
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

let obj = {
  'name': '',
  'surname': '',
  'email': '',

}

async function register(formdata){
  const user = {
    name: formdata.name,
    surname: formdata.surname,
    email: formdata.email,
    phone: formdata.phone,
    password: formdata.password
  }

  console.log(user)
  const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      mode: 'no-cors',
      body: user
    })
    console.log(res)
  }
  
  function pwdMatch(contraseña, contraseña2){
    if(contraseña != contraseña2){
      return false
    }
    return true
  }