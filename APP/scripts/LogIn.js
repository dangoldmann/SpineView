document.addEventListener('DOMContentLoaded', () => {
    const btn_submit = document.getElementById("btn_submit");
    var form = document.getElementById("formLogIn");

    btn_submit.onclick = e => {
        e.preventDefault()
        var datosUsuario = new FormData(form)

        login(datosUsuario)
    }
})

async function login(formdata){
    const url = 'http://localhost:3000/users/login'
  
    const user = {
      email: formdata.get('email'),
      password: formdata.get('password')
    }
  
    let res = await postRequest(url, user)
  
    if(res.body.error){
      console.log(res.body.error)
    }
    else{
      console.log(res.body.user)
    }
}

async function postRequest(url, data){
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    return res
}