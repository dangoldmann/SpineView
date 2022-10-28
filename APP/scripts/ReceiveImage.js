import {html, render} from 'https://unpkg.com/lit-html?module';
import { apiUrl } from './config.js';
import {isNotLoggedIn} from './tokens.js'
import {getRequest} from './http_requests.js'

const imageTest = 'https://picsum.photos/2500/3000'
let accessToken = localStorage.getItem('accessToken')
const heroDiv=document.getElementById("hero")
let imageTag;
let label;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const studyresult = (stdimage, stddate, stdname, stdresult, stdlocation, stdprecisison) => html`
<div class="below">
    <div class="image">
        <img id="stdimage" src="${stdimage}" alt="" onclick="window.open(this.src, '_blank');">
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
</div>`;

async function loadResult(){
    const id = urlParams.get('id')
    const url = apiUrl + `/radiographies/${id}/result`

    const res = await getRequest(url, accessToken)
    
    if(res.error) return alert(res.error.message)

    const result = res.result
    
    render(studyresult(`${apiUrl}/radiographies/${id}`, result.date, result.fullName, result.injury, 'Recuadrada en la imagen', result.precisison), heroDiv);
    
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
}

document.addEventListener('DOMContentLoaded', () => {
    isNotLoggedIn()
    loadResult()
});