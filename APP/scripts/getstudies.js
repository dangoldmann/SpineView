import {html, render} from 'https://unpkg.com/lit-html?module';

const studiesTab= document.getElementById("studies")

var study = (image, date, result)=> html`
    <div class="study">
    <img src="${image}" alt="">
    <div class="studytext">
        <h5>Fecha: <span>${date}</span></h5>
        <h5>Resultado: <span>${result}</span></h5>
    </div>
    </div>
`;


var fillTemplate=(template, image, date, result)=>{
    return template(image, date, result)
}

var study1 = fillTemplate(study, "../public/images/Home.png", "dd/mm/aa", "Hernia de discos")
var study2 = fillTemplate(study, "../public/images/Home.png", "dd/mm/aa", "Hernia de discos")

var templateArray = [study1, study2]
render(templateArray, studiesTab)

