async function getRequest(url, accessToken) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
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

async function postRequestForAuthentication(url, data){
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

export {getRequest, postRequest, postRequestForAuthentication}