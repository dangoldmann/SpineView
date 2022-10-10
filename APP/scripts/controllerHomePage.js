import {apiUrl} from './config.js'

document.addEventListener('DOMContentLoaded', () => {
    checkCookies()
    
    const btn_logout = document.getElementById('btn_logOut')

    btn_logout.onclick = e => {
        e.preventDefault()

        logOut()
    }
})

async function logOut(){
    const url = apiUrl + '/users/logout'

    let res = await getRequest(url)
    res = await res.json()

    if(res.redirect){
        window.location.href = res.redirect.destination
    }
}

async function checkCookies(){
    let res = await getRequest(apiUrl)
    res = await res.json()
    
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
})

function closeSideMenu() {
    document.getElementById('MenuLateral').style.width = '0';
}
function openSideMenu(){
    document.getElementById('MenuLateral').style.width = '300px';
}

var wrapper = document.getElementById("wrapper");
var navbar = document.getElementById("NavBar")
var quienesSomos = document.getElementById("a_quienesSomos");
var a_escanear = document.getElementById("a_escanear");

wrapper.addEventListener("scroll", () => {
    navbar.classList.toggle("navbarAltColor", wrapper.scrollTop>=1 );
    quienesSomos.classList.toggle("alt", wrapper.scrollTop>600 && wrapper.scrollTop<=1331);
    a_escanear.classList.toggle("alt", wrapper.scrollTop>1331);
});

async function postRequest(url, data){
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    return res
  }

async function getRequest(url){
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    })

    return res
}
function logout(){
    if (confirm("¿Está seguro que desea cerrar sesión?")){
        window.location.reload();
    }
}