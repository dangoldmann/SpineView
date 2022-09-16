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

async function register(formdata){
  const user = {
    name: formdata.get('name'),
    surname: formdata.get('surname'),
    email: formdata.get('email'),
    phone: formdata.get('phone'),
    password: formdata.get('password')
  }

  const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(user)
    })

  console.log(res.body)
}

async function login(formdata){
  const user = {
    email: formdata.get('email'),
    password: formdata.get('password')
  }

  const res = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}
  
  function pwdMatch(contraseña, contraseña2){
    if(contraseña != contraseña2){
      return false
    }
    return true
  }