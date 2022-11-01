import {html, render} from 'https://unpkg.com/lit-html?module';
import { apiUrl } from './config.js';
import {handleInvalidAccessToken, isNotLoggedIn} from './tokens.js'
import {getRequest} from './http_requests.js'

let accessToken = localStorage.getItem('accessToken')
const heroDiv=document.getElementById("hero")
var downloadBtn;
let imageTag;
let label;
let id;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const studyresult = (stdid, stddate, stdname, stdresult, stdlocation, stdprecisison) => html`
<div class="below">
    <div class="image">
        <img id="stdimage" src="${apiUrl}/radiographies/${stdid}" alt="" onclick="window.open(this.src, '_blank');">
        <h1>Espera mientras carga la imagen, esto puede tardar unos momentos</h1>
        <h2 id="label">Abrir en una pestaña</h2>
    </div>
    
    <table>
        <caption>Detectado:</caption>
        <tr>
            <th>Fecha de realización</th>
            <td>${stddate}</td>
        </tr>
        <tr>
            <th>Paciente</th>
            <td>${stdname}</td>
        <tr>
            <th>Lesión:</th>
            <td>${stdresult}</td>
        </tr>
        <tr>
            <th>Ubicación</th>
            <td>${stdlocation}</td>
        </tr>
        <tr>
            <th>Precisión</th>
            <td>${stdprecisison}</td>
        </tr>
    </table>
</div>
<a class="downloadImage" id="downloadImage" href="">Descargar Imagen</a>`;

async function loadResult(){
    id = urlParams.get('id')
    const url = apiUrl + `/radiographies/${id}/result`

    const res = await getRequest(url, accessToken)
    
    if(res.error) res = await handleInvalidAccessToken(url)

    if(res.error) return alert(res.error.message)

    const result = res.result
    
    render(studyresult(id, result.date, result.fullName, result.injury, 'Recuadrada en la imagen', result.precisison), heroDiv);
    elementsrendered()  
}

let elementsrendered=()=>{
    document.getElementById("loading").style.display="none"
    imageTag = document.getElementById("stdimage")
    label = document.getElementById("label")
    imageTag.addEventListener("mouseover", ()=>{
        label.style.opacity="0.9"
    })
    imageTag.addEventListener("mouseout", ()=>{
        label.style.opacity="0"
    })
    downloadBtn = document.getElementById('downloadImage');
    downloadBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const urldownload= apiUrl+ "/radiographies/" + +id
        downloadImage(urldownload);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    isNotLoggedIn()
    loadResult()
});

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = "study#"+id
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}