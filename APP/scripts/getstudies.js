import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'
import { verifyRefreshToken } from './refreshToken.js';

const accessToken = localStorage.getItem('accessToken')
const studiesTab= document.getElementById("studies")
var studiesArray=[]

async function getStudies(){
    const url = apiUrl + '/radiographies/all'

    const res = await getRequest(url, accessToken)

    if(res.error) {
        verifyRefreshToken()    
        accessToken = localStorage.getItem('accessToken')
        res = await getRequest(url, accessToken)
    }  

    if(res.error) return alert(res.error.message)

    const studies = res.radiographies
    console.log(studies)
}

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

export {getStudies}
