import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'
import {elementsRendered} from './controllerUserInfo.js'
import { handleInvalidAccessToken } from './tokens.js';

const accessToken = localStorage.getItem('accessToken')
const studiesTab= document.getElementById("studies")
var studiesArray=[]

async function getStudies(){

    const url = apiUrl + '/radiographies/all'
    
    let res = await getRequest(url, accessToken)
    
    if(res.error) res = await handleInvalidAccessToken(url)

    if(res.error) return alert(res.error.message)

    const studies = res.radiographies

    studies.forEach(e => {
        const studyBox = createStudyBox(e.id, e.date, e.injury)
        studiesArray.push(studyBox)
    })
    render(studiesArray, studiesTab)
    elementsRendered()
}

var createStudyBox = (stdid, date, result) => {
    var studybox = (stdid, stddate, stdresult) => html`
    <div class="studybox">
        <button id="dltstd" class="dltstd" onClick=deleteStudy(${stdid})>
            <div class="icon text">&#10006;</div>
            <div class="secondary text">¿Eliminar estudio?</div>
        </button>
        <a href="./ResultadosImagen.html?id=${stdid}">
            <div class="study">
                
                <img src="${apiUrl}/radiographies/${stdid}" alt="">
                <div class="studytext">
                    <h5>Fecha: <span>${stddate}</span></h5>
                    <h5>Resultado: <span>${stdresult}</span></h5>
                </div>
            </div>
        </a>
    </div>`
    ;
    var completestudybox = studybox(stdid, date, result)
    return completestudybox;
}

export {getStudies}
