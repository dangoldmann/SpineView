import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'
import {checkCookies} from './cookies.js'

const lblNombreCompleto = document.getElementById('lblNombreCompleto')
const lblNombreSideMenu= document.getElementById("lblNombreCompletoSideMenu")

document.addEventListener('DOMContentLoaded', () => {
    checkCookies('')

    loadUserName()

    const btn_logout = document.getElementById('btn_logOut')

    btn_logout.onclick = e => {
        e.preventDefault()
        logOut()
    }
})

async function loadUserName(){
    const url = apiUrl + '/users/full-name'

    const res = await getRequest(url)

    lblNombreCompleto.textContent = res.fullName
    lblNombreSideMenu.textContent = res.fullName
}

async function logOut(){
    const url = apiUrl + '/auth/logout'

    const res = await getRequest(url)

    if(res.redirect){
        window.location.href = res.redirect.destination
    }
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
