document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");


    btn_submit.onclick = e => {
        e.preventDefault();
        var imageToUpload = imgInput.files[0];
        
        if(imageToUpload){
            sendImage(imageToUpload);
        }
        else{
            inputArea.classList.add("highlight");   
        }
    }

    async function sendImage(imageToUpload){
        const url= apiUrl + '/images/upload';
        const res = await fetch(url, {
            method: 'POST',
            body: imageToUpload
        })
        return res;
    }

});