document.addEventListener("DOMContentLoaded", ()=>{
  const btn_submit = document.getElementById("btn_submit");
  var form = document.getElementById("formRegistro");
  var txts_passwords = document.getElementById("pass");

  btn_submit.onclick=function(e){
    var datosUsuario = new FormData(form);
    if(datosUsuario.get("ContraseniaUsuario") != datosUsuario.get("ContraseniaUsuarioConfirmar")){
      alert("Las contreñas no coinciden");
      txts_passwords.classList.add("password");
    }

    else{
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
  }
})
