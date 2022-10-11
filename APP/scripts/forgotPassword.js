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

    let res = await postRequest(url, {email})

    if(res.error){
        alert(res.error.message)
    }
}