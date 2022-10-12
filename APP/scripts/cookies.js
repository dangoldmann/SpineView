import {getRequest} from './http_requests.js'
import {apiUrl} from './config.js'

async function checkCookies(path){
    const url = apiUrl + path
  
    const res = await getRequest(url)
  
    if(res.redirect){
      window.location.href = res.redirect.destination
    }
}

export {checkCookies}