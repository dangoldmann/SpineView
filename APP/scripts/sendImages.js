import {html, render} from 'https://unpkg.com/lit-html?module';

document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");
    var imageToUpload;
    var res;


    btn_submit.onclick = e => {
        e.preventDefault();
        imageToUpload = imgInput.files[0];
        
        if(imageToUpload){
            const formdata = new FormData();
            formdata.append('image', imageToUpload);
            res = sendImage(formdata);
        }
        else{
            inputArea.classList.add("highlight");   
        }
    }

    async function sendImage(formdata){
        const url= apiUrl + '/images/upload';
        var res = await fetch(url, {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            let diverror= document.getElementById("error");
            let divwrapper = document.getElementById("wrapper");
            let intentaste = document.getElementById("intentaste");
            let divhero = document.getElementById("hero");

            const myTemplate = (imagename) => html`
                <div id="error">
                    <h1 class="errormsg1 errormsg">Lo sentimos, algo Salió Mal</h1>
                    <!-- <h2 class="errormsg2 errormsg">Parece que el servidor no esta en funcionamiento</h2> -->
                    <h2 class="errormsg2 errormsg">Parece que la IA o el servidor no estan en funcionamiento</h2>
                    <h3 class="errormsg3 errormsg" id="intentaste">No se pudo subir "${imagename}"</h3>
                    <div class="btns">
                        <a class="btn" onclick=document.location.reload()>volver a intentar</a>
                        <a href="HomePage.html" class="btn">Volver al inicio</a>
                    </div>
                </div>`;
            divhero.style.display = "none";
            let imagename=imageToUpload.name
            render(myTemplate(imagename), divwrapper);
        });
        return res;
    }
});