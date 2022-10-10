import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'

document.addEventListener("DOMContentLoaded", ()=>{
    console.log(apiUrl)
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");
    var imageToUpload;
    var res;


    btn_submit.onclick = e => {
        e.preventDefault();
        imageToUpload = imgInput.files[0];
        
        if(!imageToUpload){
            inputArea.classList.add('highlight')
            return
        }

        const formData = new FormData();
        formData.append('image', imageToUpload);
        
        sendImage(formData);
    }

async function sendImage(formData) {
    const url = apiUrl + '/images/upload'
    let res = await postRequest(url, formData)

    if(res.error) alert(res.error.message)
    console.log(res)
    
}

async function postRequest(url, data){
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: data
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

    return res.json()
}
});