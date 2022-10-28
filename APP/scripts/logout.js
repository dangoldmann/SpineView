import {apiUrl} from './config.js'
import {getRequestWithCredentials} from './http_requests.js'

async function logOut() {
    const url = apiUrl + '/auth/logout'

    localStorage.removeItem('accessToken')
    const res = await getRequestWithCredentials(url)

    if (res.redirect) window.location.href = res.redirect.destination
}

export {logOut}