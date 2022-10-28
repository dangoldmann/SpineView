import {apiUrl} from './config.js'
import { deleteRequest } from './http_requests.js'

const accessToken = localStorage.getItem('accessToken')

async function deleteStudy(id){
    const url = apiUrl + '/radiographies/' + id
    const res = await deleteRequest(url, accessToken)
    if(res.error) return alert(res.error.message)
    alert("Estudio eliminado")
    window.location.reload()
}

export {deleteStudy}