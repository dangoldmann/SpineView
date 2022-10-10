import {apiUrl} from './config.js'

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
    res = await res.json()

}

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