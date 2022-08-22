export default function NavBar(){
    return (
        <nav class="navbar" id="NavBar">
            <button id="btn_usuario" onclick="openSideMenu()"><img id="imgUsuario" src="./Imagenes/Usuario.png"/></button>
            <ul id="links">
                <li><a href="#segundaseccion" class="link" id="a_quienesSomos">Quiénes somos</a></li>
                <li><a class="link" href="IngresarImagen.html" id="a_escanear">Escanear estudio</a></li>
                <li><a class="link" href="" id="masInfo">Más Información</a></li>
            </ul>

            <a href="" onclick="BackToTop()"><img src="./Imagenes/LogoOsia.png" id="logo"/></a>
            
            <div id="MenuLateral" class="menulateral">
                <img class="imgUsuario" src="./Imagenes/Usuario.png"/>
                <a href="#" class="cerrar" id="cerrar" onclick="closeSideMenu()">&laquo;</a>
                <ul>
                    <a href="#segundaseccion">Opción 1</a>
                    <a href="">Opción 2</a>
                    <a href="">Opción 3</a>
                </ul>
            </div>
        </nav>
)}