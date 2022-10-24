import {html, render} from 'https://unpkg.com/lit-html?module';
import {getRequest} from './http_requests.js'

const heroDiv=document.getElementById("hero")

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

var stdname = result.name;
var stddate = result.Date;
var stdresult = result.result;
var stdlocation = result.location;
var stdprecisison = result.precision;

render(studyresult("https://picsum.photos/2500/3000", stddate, stdname, stdresult, stdlocation, stdprecisison), heroDiv);

var imageTag = document.getElementById("stdimage")
var label = document.getElementById("label")
console.log(imageTag)
imageTag.addEventListener("mouseover", ()=>{
    label.style.opacity="0.9"
})
imageTag.addEventListener("mouseout", ()=>{
    label.style.opacity="0"
})