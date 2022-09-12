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
    if(datosUsuario.get("ContraseniaUsuario") != datosUsuario.get("ContraseniaUsuarioConfirmar")){
      alert("Las contreñas no coinciden");
      txts_passwords.classList.add("passwordwrong");
      lbl_password.classList.add("passwordwrong")
    }

    else if (isComplete(datosUsuario)){
      fetch('http://localhost:3000/users/register', {
        Method: 'POST',
        Headers: {
        Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        Body: JSON.stringify(datosUsuario),
        Cache: 'default'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      registerUser().catch(err => {
        console.log(err)
      })
    }

    else{
      alert("Asegurate de haber completado todos los campos ");
    }
      
  }
})

async function registerUser(){
  const res = await fetch('https://www.thecocktaildb.com/')
  const blob = res.blob()
  console.log(blob)
}
