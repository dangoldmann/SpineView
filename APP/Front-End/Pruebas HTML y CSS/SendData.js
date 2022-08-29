const submit = document.getElementById("btn_submit");
const form = document.getElementById("formRegistro");
var datosUsuario = new FormData(form);

let test = () =>{
    console.log('a');
    if (datosUsuario.get("ContraseniaUsuario")!=datosUsuario.get("ContraseniaUsuarioConfirmar")){
        alert("Las contraseñas no coinciden");
    }

    else{
        $.ajax({
            method:"POST",
            url:"http://localhost:3000/data",
            data:JSON.stringify({datosUsuario}),
            contentType:"application/json"
        }).done(function(data) {
            alert(data); // imprimimos la respuesta
          }).fail(function() {
            alert("Algo salió mal");
          }).always(function() {
            alert("Siempre se ejecuta")
          });

          window.location.href="HomePage.html";
    }
};

submit.onclick = function(e){
    e.preventDefault();
    console.log("AAAAAAAAAAA"); 
    test();
};