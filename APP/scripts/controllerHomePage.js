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

