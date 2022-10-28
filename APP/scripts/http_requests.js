async function getRequest(url, accessToken) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    })

    return res.json()
}

async function getRequestWithCredentials(url){
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    })

    return res.json()
}

async function postRequest(url, data, accessToken) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + accessToken
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

async function postRequestWithCredentials(url, data){
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    return res.json()
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

export {getRequest, getRequestWithCredentials, postRequest, postRequestWithCredentials, deleteRequest}