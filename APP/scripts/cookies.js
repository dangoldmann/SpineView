import {getRequest} from './http_requests.js'
import {apiUrl} from './config.js'

async function checkCookies(){
    const url = apiUrl + '/auth/login'
  
    const res = await getRequest(url)
  
    if(res.redirect){
      window.location.href = res.redirect.destination
    }
}

export {checkCookies}