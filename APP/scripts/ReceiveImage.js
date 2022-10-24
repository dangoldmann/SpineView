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

render(studyresult("https://picsum.photos/2500/3000", "2020-12-12", "Juan Perez", "Hernia de disco", "Recuadrada en la imagen", "99%"), heroDiv);

var imageTag = document.getElementById("stdimage")
var label = document.getElementById("label")
console.log(imageTag)
imageTag.addEventListener("mouseover", ()=>{
    label.style.opacity="0.9"
})
imageTag.addEventListener("mouseout", ()=>{
    label.style.opacity="0"
})