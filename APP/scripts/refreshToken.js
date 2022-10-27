import {apiUrl} from './config.js'

async function verifyRefreshToken(logIn){
    logIn = logIn || false
    const url = apiUrl + '/auth/refresh-token'

    const res = await postRequest(url)
    
    if(res.redirect && logIn === false) return window.location.href = res.redirect.destination

    localStorage.setItem('accessToken', res.access_token)
}

async function postRequest(url) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    return res.json()
}

export {verifyRefreshToken}

