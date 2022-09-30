document.addEventListener("DOMContentLoaded", ()=>{
    const inpFile = document.getElementById("imgInput");
    const previewContainer = document.getElementById("previews");
    const previewImage = previewContainer.querySelector(".img-preview__image");
    const previewDefaultText = previewContainer.querySelector(".img-preview__default-text");
    const ingresarImagenes = document.getElementById("ingresarImagenes");
    const redo = document.getElementById("redo");
    
    inpFile.addEventListener("change", function(){
        const file = this.files[0];
        if(file){
            const reader = new FileReader();
            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";
            reader.addEventListener("load", function(){
                previewImage.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file);
        }else{
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
            previewImage.setAttribute("src", "");
        }

        ingresarImagenes.style.display = "none";
        previewContainer.classList.add("bigPreview");
        redo.style.display = "inline-block";
    });
});