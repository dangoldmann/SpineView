import imgUsuario from '../assets/Usuario.png'
import logoOsia from "../assets/logoOsia.png"

function NavBar(){
    return (
        <nav className="navbar" id="NavBar">
            <button id="btn_usuario" onclick="openSideMenu()"><img id="imgUsuario" src={imgUsuario}/></button>
            <ul id="links">
                <li><a href="#segundaseccion" className="link" id="a_quienesSomos">Quiénes somos</a></li>
                <li><a className="link" href="IngresarImagen.html" id="a_escanear">Escanear estudio</a></li>
                <li><a className="link" href="" id="masInfo">Más Información</a></li>
            </ul>

            <a href="" onclick="BackToTop()"><img src={logoOsia} id="logo"/></a>
            
            <div id="MenuLateral" className="menulateral">
                <img className="imgUsuario" src="../assets/Usuario.png"/>
                <a href="#" className="cerrar" id="cerrar" onclick="closeSideMenu()">&laquo;</a>
                <ul>
                    <a href="#segundaseccion">Opción 1</a>
                    <a href="">Opción 2</a>
                    <a href="">Opción 3</a>
                </ul>
            </div>
        </nav>
)}

export default   NavBar;