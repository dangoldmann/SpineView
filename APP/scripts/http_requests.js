async function getRequest(url) {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    })

    return res.json()
}

async function postRequest(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export {getRequest, postRequest}