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

wrapper.addEventListener("scroll", () => {
    navbar.classList.toggle("navbarAltColor", wrapper.scrollTop>=1 );
    console.log(wrapper.scrollTop);
});


function BackToTop() {
    document.wrapper.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
