import {apiUrl} from './config.js'
import {postRequest} from './http_requests.js'

let accessToken = localStorage.getItem('accessToken')

async function isLoggedIn(){
    const url = apiUrl + '/auth/isLoggedIn'

    let res = await postRequest(url, {}, accessToken)

    if(!res.redirect) {
        accessToken = await verifyRefreshToken(true)
        if(typeof accessToken != 'undefined'){
            localStorage.setItem('accessToken', accessToken)
            return window.location.href = './HomePage.html'
        }
        return
    }

    window.location.href = res.redirect.destination
}

async function isNotLoggedIn(){
    const url = apiUrl + '/auth/isNotLoggedIn'

    let res = await postRequest(url, {}, accessToken)

    if(res.error) {
        accessToken = await verifyRefreshToken()
        if(typeof accessToken != 'undefined') {
            localStorage.setItem('accessToken', accessToken)
            return
        }
        window.location.href = './LogIn.html'
    }
}

async function verifyRefreshToken(logIn){
    logIn = logIn || false
    const url = apiUrl + '/auth/refresh-token'

    const res = await postRequestRT(url)
    
    if(res.redirect && logIn === false) window.location.href = res.redirect.destination
    
    if(res.access_token) return res.access_token

    return
}

async function postRequestRT(url) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    return res.json()
}

export {verifyRefreshToken, isLoggedIn, isNotLoggedIn}

