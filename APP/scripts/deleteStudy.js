const url = "http://localhost:3000"
const accessToken = localStorage.getItem('accessToken')

async function deleteStudy(id){
    // const url = apiUrl + '/radiographies/' + id
    // const res = await deleteRequest(url, accessToken)
    // if(res.error) return alert(res.error.message)
    alert("Estudio eliminado"+id)
    // window.location.reload()
}

async function deleteRequest(url, accessToken) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    })

    return res.json()
}
