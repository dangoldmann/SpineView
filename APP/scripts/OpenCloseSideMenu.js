const closeSideMenu=(() =>{
    document.getElementById('MenuLateral').style.width = '0';
});

const openSideMenu = (()=>{
    document.getElementById('MenuLateral').style.width = '350px';
});

var openTab = (tabName) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
}

document.addEventListener('keydown', function(event) {
    if (event.key == "Escape") {
        closeSideMenu();
    }
});