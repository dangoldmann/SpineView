import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'
import { verifyRefreshToken } from './tokens.js';

const accessToken = localStorage.getItem('accessToken')
const studiesTab= document.getElementById("studies")
var studiesArray=[]

async function getStudies(){
    const url = apiUrl + '/radiographies/all'

    const res = await getRequest(url, accessToken)

    if(res.error) return alert(res.error.message)

    const studies = res.radiographies
    console.log(studies)
}

// let allUserStudies=getStudies()
//La funcion getStudies() deberia devolver un array de objetos, dentro de cada objeto tiene que haber
//un ID, la fecha del estudio y el resultado

var createStudyBox=(stdid, date, result)=>{
    var studybox = (stdid, stddate, stdresult)=> html`
    <a href="./ResultadosImagen.html?id=${stdid}">
        <div class="study">
            <img src="https://picsum.photos/200/300?id=${stdid}" alt="">
            <div class="studytext">
                <h5>Fecha: <span>${stddate}</span></h5>
                <h5>Resultado: <span>${stdresult}</span></h5>
            </div>
        </div>
    </a>`
    ;
    var completestudybox = studybox(stdid, date, result)
    return completestudybox;
}

let allUserStudies=[ //Hardcodeado
    {
        stdId:"1",
        stddate:"dd/mm/aaaa",
        stdresult:"Fisura de vertebra"
    },
    {
        stdId:"2",
        stddate:"dd/mm/aaaa",
        stdresult:"Hernia de discos"
    }
]

allUserStudies.forEach(el => {
    var id= el.stdId
    var date=el.stddate
    var result=el.stdresult
    
    var studyBox = createStudyBox(id, date, result)
    studiesArray.push(studyBox)
});

render(studiesArray, studiesTab)

export {getStudies}
