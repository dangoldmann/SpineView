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
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/data",
        data:JSON.stringify({datosUsuario}),
        contentType:"application/json"
      }).done(function(data) {
        window.location.href="HomePage.html"
      }).fail(function(data){
        alert("Algo salio mal");
      })
    }

    else{
      alert("Asegurate de haber completado todos los campos ");
    }
      
  }
})
