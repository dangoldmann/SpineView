import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import { verifyRefreshToken, isNotLoggedIn } from './tokens.js';

let accessToken = localStorage.getItem('accessToken')

document.addEventListener("DOMContentLoaded", ()=>{
    isNotLoggedIn()
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");
    var date;
    var imageToUpload;

    btn_submit.onclick = e => {
        e.preventDefault();
        imageToUpload = imgInput.files[0];
        
        if(!imageToUpload){
            inputArea.classList.add('highlight')
            return
        }

        const formData = new FormData();
        date= document.getElementById("stddate").value
        formData.append('date', date)
        formData.append('image', imageToUpload);
        
        sendImage(formData);
    }

async function sendImage(formData) {
    const url = apiUrl + '/radiographies/upload'
    
    let res = await postRequest(url, formData)

    if(res.error) {
        accessToken = await verifyRefreshToken()
        if(typeof accessToken != 'undefined'){
            localStorage.setItem('accessToken', accessToken)
            res = await postRequest(url, formData)
        }
        else window.location.href = './LogIn.html'
    }

    if(res.error) return alert(res.error.message)

    if(res.radiographyId){
        const id = res.radiographyId
        window.location.href = `./ResultadosImagen.html?id=${id}`
    }
}

async function postRequest(url, data){
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization' : 'Bearer ' + accessToken
      },
      body: data
    })
    .catch(err => {
        let divwrapper = document.getElementById("wrapper");
        let divhero = document.getElementById("hero");

        const myTemplate = (imagename) => html`
            <div id="error">
                <h1 class="errormsg1 errormsg">Lo sentimos, algo Salió Mal</h1>
                <!-- <h2 class="errormsg2 errormsg">Parece que el servidor no esta en funcionamiento</h2> -->
                <h2 class="errormsg2 errormsg">Parece que la IA o el servidor no estan en funcionamiento</h2>
                <h3 class="errormsg3 errormsg">No se pudo subir "${imagename}"</h3>
                <div class="btns">
                    <a class="btn" onclick=document.location.reload()>volver a intentar</a>
                    <a href="HomePage.html" class="btn">Volver al inicio</a>
                </div>
            </div>
        `;
        divhero.style.display = "none";
        let imagename=imageToUpload.name
        render(myTemplate(imagename), divwrapper);
    });

    return res.json()
}
});