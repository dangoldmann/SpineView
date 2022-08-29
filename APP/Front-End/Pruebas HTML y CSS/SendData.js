import $ from jQuery;

var form = document.getElementById("formRegistro");
var output = document.getElementById("output");

form.addEventListener("submit", ()=>{
    var formData = new FormData(form);

    if(formData.get("ContraseniaUsuario"!=formData.get("ContraseniaUsuarioConfirmar"))){
        output.innerHTML = "Las contraseñas no coinciden";
    }
    else{
        var req= new XMLHttpRequest();
        req.open("POST", "/routes/users", true);
        req.onload = function(){
            if(req.status == 200){
                output.innerHTML = "Usuario registrado";
            }
            else{
                output.innerHTML = "Error al registrar usuario";
            }
        }
        req.send(formData);
        form.submit();
    }
})