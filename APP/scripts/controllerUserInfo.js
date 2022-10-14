import {apiUrl} from './config.js'
import {checkCookies} from './cookies.js'
import {getRequest} from './http_requests.js'

checkCookies('')

const lblFullName = document.getElementById('fullName')
const lblEmail = document.getElementById('email')
const lblPhone = document.getElementById('phone')

document.addEventListener('DOMContentLoaded', () => {
    loadData()
})

async function loadData(){
    const url = apiUrl + '/users/info'

    const res = await getRequest(url)
    const userInfo = res.userInfo

    lblFullName.textContent = userInfo.fullName
    lblEmail.textContent = userInfo.email
    lblPhone.textContent = userInfo.phone
}