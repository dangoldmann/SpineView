import {html, render} from 'https://unpkg.com/lit-html?module';
import { apiUrl, cloudinaryApiUrl } from './config.js';
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
const studyresult = (imageRoute, stddate, stdname) => html`
<div class="below">
    <div class="image">
        <img id="stdimage" src="${cloudinaryApiUrl}${imageRoute}" alt="" onclick="window.open(this.src, '_blank');">
        <h2 id="label">Abrir en una pestaña</h2>
    </div>
    
    <table>
        <tr>
            <th>Fecha de realización:</th>
            <td>${stddate}</td>
        </tr>
        <tr>
            <th>Paciente:</th>
            <td>${stdname}</td>
    </table>
</div>
<a class="downloadImage" id="downloadImage" href="">Descargar Imagen</a>`;

async function loadResult(){
    id = urlParams.get('id')
    const url = apiUrl + `/radiographies/${id}/result`

    let res = await getRequest(url, accessToken)
    
    if(res.error) res = await handleInvalidAccessToken(url)

    if(res.error) return alert(res.error.message)

    const result = res.result
    
    render(studyresult(result.imageRoute, result.date, result.fullName), heroDiv);
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