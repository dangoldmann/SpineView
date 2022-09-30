document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'http://localhost:3000';
    const form= document.getElementById("form");
    const btn_submit = document.getElementById("btn_submit");

    let isComplete = dataform => {
        let arraydata = [];
        for (let el of dataform.values()){
            arraydata.push(el);
        }
        
        let result = arraydata.some((e)=>{
            if (e == ""){
                return true;
            }
            return false;
        });
        return !result;
    }

    btn_submit.onclick = e => {
        e.preventDefault();
        var imageToUpload = new FormData(form);
    }
});