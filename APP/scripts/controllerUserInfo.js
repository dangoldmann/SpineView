import { apiUrl } from './config.js'
import { getRequest } from './http_requests.js'
import { logOut } from './logout.js'
import { getStudies } from './getstudies.js'
import { isNotLoggedIn, handleInvalidAccessToken } from './tokens.js'

let accessToken = localStorage.getItem('accessToken')
const lblFullName = document.getElementById('fullName')
const lblEmail = document.getElementById('email')
const lblPhone = document.getElementById('phone')
const lblNombreSideMenu = document.getElementById("lblNombreCompletoSideMenu")
const btn_logout = document.getElementById('btn_logOut')

document.addEventListener('DOMContentLoaded', () => {
    isNotLoggedIn()
    loadUserInfo()
    getStudies()
    
    btn_logout.onclick = e => {
        e.preventDefault()
        logOut()
    }
})

async function loadUserInfo(){
    const url = apiUrl + '/users/info'

    let res = await getRequest(url, accessToken)

    if(res.error) res = await handleInvalidAccessToken(url)

    if(res.error) return alert(res.error.message)

    const userInfo = res.userInfo
    
    lblFullName.textContent = userInfo.fullName
    lblEmail.textContent = userInfo.email
    lblPhone.textContent = userInfo.phone
    lblNombreSideMenu.textContent = userInfo.fullName
}