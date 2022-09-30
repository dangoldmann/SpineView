document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const imgInput = document.getElementById(imgInput);
    const btn_submit = document.getElementById("btn_submit");
    
    btn_submit.onclick = e => {
        e.preventDefault();
        var datosUsuario = new FormData(form);
        var img = imgInput.files[0];
        var imgName = imgInput.name;
        var imgType = imgInput.type;
        var imgSize = imgInput.size;
        var imgPath = imgInput.path;
        
        var imgData = {
            img: img,
            imgName: imgName,
            imgType: imgType,
            imgSize: imgSize,
            imgPath: imgPath
        }
        
        sendImage(imgData);
    }

    async function sendImage(imgData){
        const url = apiUrl + "/images/upload";
        const formData = new FormData();
        formData.append("img", imgData.img);
        formData.append("imgName", imgData.imgName);
        formData.append("imgType", imgData.imgType);
        formData.append("imgSize", imgData.imgSize);
        formData.append("imgPath", imgData.imgPath);
        
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        console.log(data);
    }


});