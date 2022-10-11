import {apiUrl} from './config.js'
import {postRequest} from './http_requests'

document.addEventListener('DOMContentLoaded', () => {
    const btn_submit = document.getElementById("btn_submit");
    var form = document.getElementById("formLogIn");

    btn_submit.onclick = e => {
        e.preventDefault()
        var datosUsuario = new FormData(form)

        resetPassword(datosUsuario)
    }
})

async function resetPassword(formData) {
    const url = apiUrl + '/test/reset-password'

    const password = formData.get('password')

    let res = await postRequest(url, password)

}