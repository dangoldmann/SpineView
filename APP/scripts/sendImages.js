document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");


    btn_submit.onclick = e => {
        e.preventDefault();
        var imageToUpload = imgInput.files[0];
        
        if(imageToUpload){
            const formdata = new FormData();
            formdata.append('image', imageToUpload);
            const res = sendImage(formdata);
        }
        else{
            inputArea.classList.add("highlight");   
        }
    }

    async function sendImage(formdata){
        const url= apiUrl + '/images/upload';
        let res = await fetch(url, {
            method: 'POST',
            body: formdata
        })
        return res;
    }

});