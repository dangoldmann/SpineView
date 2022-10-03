document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const imgInput = document.getElementById("imgInput");
    const btn_submit = document.getElementById("btn_submit");
    var inputArea = document.getElementById("ingresarImagenes");
    var res;


    btn_submit.onclick = e => {
        e.preventDefault();
        var imageToUpload = imgInput.files[0];
        
        if(imageToUpload){
            const formdata = new FormData();
            formdata.append('image', imageToUpload);
            res = sendImage(formdata);
        }
        else{
            inputArea.classList.add("highlight");   
        }
    }

    async function sendImage(formdata){
        const url= apiUrl + '/images/upload';
        var res = await fetch(url, {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            let diverror= document.getElementById("error");
            let divwrapper = document.getElementById("wrapper");
            divwrapper.style.display = "none";
            diverror.style.display = "flex";
        });
        return res;
    }
});