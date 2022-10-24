import {apiUrl} from './config.js'
import {getRequest} from './http_requests.js'

async function logOut() {
    const url = apiUrl + '/auth/logout'

    localStorage.clear()
    const res = await getRequest(url)

    if (res.redirect) window.location.href = res.redirect.destination
}

export {logOut}