import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'

const studiesTab= document.getElementById("studies")
var studiesArray=[]

let createStudyBox=(id, image, date, result)=>{
    let studybox = (stdId, stdimage, stddate, stdresult)=> html`
    <a href="./ResultadosImagen.html?id=${stdId}">
        <div class="study" id="study">
        <img src="${stdimage}">
        <div class="studytext">
            <h5>Fecha: <span>${stddate}</span></h5>
            <h5>Resultado: <span>${stdresult}</span></h5>
        </div>
        </div>
    </a>`;
    var completestudybox = studybox(id, image, date, result)
    return completestudybox;
}

// async function getStudies(){
//     const url = apiUrl + "/radiographies"
//     const res = await getRequest(url)
//     var allUserStudies = res.studies
//     return allUserStudies
// }

// var allUserStudies = getStudies()

let allUserStudies=[ //Hardcodeado
    {
        stdId:"a",
        stdimage:"../public/images/columna.jpg",
        stddate:"dd/mm/aaaa",
        stdresult:"Fisura de vertebra"
    },
    {
        stdId:"a",
        stdimage:"../public/images/Home.png",
        stddate:"dd/mm/aaaa",
        stdresult:"Hernia de discos"
    }
]

allUserStudies.forEach(el => {
    var id= el.stdId
    var image= el.stdimage
    var date=el.stddate
    var result=el.stdresult
    
    var studyBox = createStudyBox(id, image, date, result)
    studiesArray.push(studyBox)
});

render(studiesArray, studiesTab)
