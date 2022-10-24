import {html, render} from 'https://unpkg.com/lit-html?module';
import {apiUrl} from './config.js'
import {postRequest} from './http_requests.js'

document.addEventListener('DOMContentLoaded', () => {
    const btn_submit = document.getElementById('btn_submit')
    const form = document.getElementById('formResetPassword')

    btn_submit.onclick = e => {
        e.preventDefault()
        const datosUsuario = new FormData(form)

        forgotPassword(datosUsuario)
    }
})

async function forgotPassword(formData) {
    const url = apiUrl + '/users/forgot-password'
    const email = formData.get('email')

    let res = await postRequest(url, {email}, '')

    if(res.error) return alert(res.error.message)

    let heroDiv= document.getElementById('hero')
    let center= document.getElementById("center")
    heroDiv.style.display = "none"

    const myTemplate = () => html`
        <div id="mailsent">
            <h1>Se envio el email</h1>
            <h3>Revisa tu casilla de correo</h3>
            <a href="Login.html" class="btn">Volver al LogIn</a>
        </div>`;
    
    render(myTemplate(), center)
}