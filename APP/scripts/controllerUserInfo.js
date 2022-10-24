<<<<<<< Updated upstream
import {apiUrl} from './config.js'
import {checkCookies} from './cookies.js'
import {getRequest} from './http_requests.js'
checkCookies('')

document.getElementById("DOMContentLoaded",()=>{
    const lblFullName = document.getElementById('fullName')
    const lblEmail = document.getElementById('email')
    const lblPhone = document.getElementById('phone')
    const lblNombreSideMenu= document.getElementById("lblNombreCompletoSideMenu")

    loadData()

    async function loadData(){
        const url = apiUrl + '/users/info'
        const res = await getRequest(url)
        const userInfo = res.userInfo

        lblFullName.textContent = userInfo.fullName
        lblEmail.textContent = userInfo.email
        lblPhone.textContent = userInfo.phone
    }

    async function loadUserName(){
        const url = apiUrl + '/users/full-name'

        const res = await getRequest(url)

        lblNombreSideMenu.textContent = res.fullName
    }

    const btn_logout = document.getElementById('btn_logOut')

        btn_logout.onclick = e => {
            e.preventDefault()
            logOut()
    }

    async function logOut(){
        const url = apiUrl + '/auth/logout'

        const res = await getRequest(url)

        if(res.redirect){
            window.location.href = res.redirect.destination
        }
    }
    loadUserName();
})

=======
import { apiUrl } from './config.js'
import { getRequest } from './http_requests.js'
import { logOut } from './logout.js'
import { getStudies } from './getstudies.js'
import { verifyRefreshToken } from './refreshToken.js'

const accessToken = localStorage.getItem('accessToken')
const lblFullName = document.getElementById('fullName')
const lblEmail = document.getElementById('email')
const lblPhone = document.getElementById('phone')
const lblNombreSideMenu = document.getElementById("lblNombreCompletoSideMenu")
const btn_logout = document.getElementById('btn_logOut')

document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo()
    getStudies()
    
    btn_logout.onclick = e => {
        e.preventDefault()
        logOut()
    }
})

async function loadUserInfo(){
    const url = apiUrl + '/users/info'

    const res = await getRequest(url, accessToken)
    console.log(res)
    if(res.error) {
        verifyRefreshToken()    
        accessToken = localStorage.getItem('accessToken')
        res = await getRequest(url, accessToken)
    }  

    if(res.error) return alert(res.error.message)

    const userInfo = res.userInfo
    
    lblFullName.textContent = userInfo.fullName
    lblEmail.textContent = userInfo.email
    lblPhone.textContent = userInfo.phone
    lblNombreSideMenu.textContent = userInfo.fullName
}
>>>>>>> Stashed changes
