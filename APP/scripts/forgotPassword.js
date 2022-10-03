const apiUrl = 'https://osia-api-production.up.railway.app'
//const apiUrl = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
    checkCookies()
    
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
    res = await res.json()

    if(res.error){
        alert(res.error.message)
    }
}

async function checkCookies(){
    let res = await getRequest(apiUrl)
    res = await res.json()

    if(res.redirect){
        window.location.href = res.redirect.destination
    }
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

async function getRequest(url){
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    })

    return res
}