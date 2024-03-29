import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'
import { logOut } from './logout.js'
import { isNotLoggedIn, handleInvalidAccessToken } from './tokens.js'

let accessToken = localStorage.getItem('accessToken')
const lblNombreCompleto = document.getElementById('lblNombreCompleto')
const lblNombreSideMenu = document.getElementById("lblNombreCompletoSideMenu")
const btn_logout = document.getElementById('btn_logOut')

document.addEventListener('DOMContentLoaded', () => {
    isNotLoggedIn()
    loadUserName()

    btn_logout.onclick = e => {
        e.preventDefault()
        logOut()
    }
})

async function loadUserName(){
    const url = apiUrl + '/users/full-name'

    let res = await getRequest(url, accessToken)

    if(res.error) res = await handleInvalidAccessToken(url)

    if(res.error) return alert(res.error.message)

    lblNombreCompleto.textContent = res.fullName
    lblNombreSideMenu.textContent = res.fullName
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const closeSideMenu=(() =>{
    document.getElementById('MenuLateral').style.width = '0';
});

const openSideMenu = (()=>{
    document.getElementById('MenuLateral').style.width = '300px';
});

var wrapper = document.getElementById("wrapper");
var navbar = document.getElementById("NavBar")
var quienesSomos = document.getElementById("a_quienesSomos");
var a_escanear = document.getElementById("a_escanear");

wrapper.addEventListener("scroll", () => {
    navbar.classList.toggle("navbarAltColor", wrapper.scrollTop>=1 );
    quienesSomos.classList.toggle("alt", wrapper.scrollTop>600 && wrapper.scrollTop<=1331);
    a_escanear.classList.toggle("alt", wrapper.scrollTop>1331);
});

export {loadUserName}