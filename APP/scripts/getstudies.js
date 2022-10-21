import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'

const studiesTab= document.getElementById("studies")
var studiesArray=[]

var createStudyBox=(image, date, result)=>{
    var studybox = (stdimage, stddate, stdresult)=> html`
    <div class="study">
    <img src="${stdimage}" alt="">
    <div class="studytext">
        <h5>Fecha: <span>${stddate}</span></h5>
        <h5>Resultado: <span>${stdresult}</span></h5>
    </div>
    </div>`;
    var completestudybox = studybox(image, date, result)
    return completestudybox;
}

// async function getStudies(){
//     const url = apiUrl + "/radiographies"
//     const res = await getRequest(url)
//     var allUserStudies = res.studies
//     return allUserStudies
// }

// var allUserStudies = getStudies()

var allUserStudies=[
    {
        stdimage:"../public/images/columna.jpg",
        stddate:"xx/xx/xx",
        stdresult:"Fisura de vertebra"
    },
    {
        stdimage:"../public/images/Home.png",
        stddate:"xx/xx/xx",
        stdresult:"Hernia de discos"
    }
]

allUserStudies.forEach(el => {
    var image= el.stdimage
    var date=el.stddate
    var result=el.stdresult
    
    var studyBox = createStudyBox(image, date, result)
    studiesArray.push(studyBox)
});

render(studiesArray, studiesTab)