import {html, render} from 'https://unpkg.com/lit-html?module';
import { apiUrl } from './config.js';
import {isNotLoggedIn} from './tokens.js'
import {getRequest} from './http_requests.js'

let accessToken = localStorage.getItem('accessToken')
const heroDiv=document.getElementById("hero")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.addEventListener('DOMContentLoaded', () => {
    isNotLoggedIn()
    loadResult()
})

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

    const res = await getRequest(url, id, accessToken)

    if(res.error) return alert(res.error.message)

    const result = res.result
    console.log(result)
}

const result = {
    stdurl:"https://picsum.photos/2500/3000",
    Date:"2021-05-05",
    name: "Juan Perez",
    result: "Hernia", 
    location: "Recuadrada en la imagen",
    precision: "99%"
};

let stdurl = result.stdurl
let stdname = result.name
let stddate = result.Date
let stdresult = result.result
let stdlocation = result.location
let stdprecisison = result.precision

render(studyresult(stdurl, stddate, stdname, stdresult, stdlocation, stdprecisison), heroDiv);
document.getElementById("loading").style.display="none"

var imageTag = document.getElementById("stdimage")
var label = document.getElementById("label")
console.log(imageTag)
imageTag.addEventListener("mouseover", ()=>{
    label.style.opacity="0.9"
})
imageTag.addEventListener("mouseout", ()=>{
    label.style.opacity="0"
})