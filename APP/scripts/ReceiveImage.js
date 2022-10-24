import {html, render} from 'https://unpkg.com/lit-html?module';
import {getRequest} from './http_requests.js'

const heroDiv=document.getElementById("hero")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const studyresult = (stdimage, stddate, stdname, stdresult, stdlocation, stdprecisison) => html`
<div class="below">
    <div class="image">
        <img id="stdimage" src="${stdimage}" alt="" onclick="window.open(this.src, '_blank');">
        <h1 id="label">Abrir en una pestaña</h1>
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

// const result = await getRequest('/api/studyresult');
//let stdurl = urlParams.get("id")
// var stdname = result[0].name;
// var stddate = result[0].date;
// var stdresult = result[0].result;
// var stdlocation = result[0].location;
// var stdprecisison = result[0].precision;

const result = {
    Date:"2021-05-05",
    name: "Juan Perez",
    result: "Hernia", 
    location: "Recuadrada en la imagen",
    precision: "99%"
};

let stdurl = "https://picsum.photos/2500/3000"
let stdname = result.name
let stddate = result.Date
let stdresult = result.result
let stdlocation = result.location
let stdprecisison = result.precision

render(studyresult(stdurl, stddate, stdname, stdresult, stdlocation, stdprecisison), heroDiv);

var imageTag = document.getElementById("stdimage")
var label = document.getElementById("label")
console.log(imageTag)
imageTag.addEventListener("mouseover", ()=>{
    label.style.opacity="0.9"
})
imageTag.addEventListener("mouseout", ()=>{
    label.style.opacity="0"
})