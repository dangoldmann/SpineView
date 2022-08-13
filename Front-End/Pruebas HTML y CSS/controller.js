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
