document.addEventListener("DOMContentLoaded", ()=>{
    var form = document.getElementById("ingresarImagenes");
    var fileInput = document.getElementById("imgInput");
    var dropArea = document.getElementById("ingresarImagenes")
    const btn_wrongimg = document.getElementById('btn_wrongimg')

    btn_wrongimg.onclick = e => {
        fileInput.click()
    }

    form.addEventListener("click", () =>{
        fileInput.click();
    });

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })
    
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })
    
    function highlight(e) {
        dropArea.classList.add('highlight')
    }
    
    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }

    //take the dropped file and add it to FileInput 
    // dragover and dragenter events need to have 'preventDefault' called
    // in order for the 'drop' event to register. 
    // See: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#droptargets
    dropArea.ondragover = dropArea.ondragenter = function(evt) {
        evt.preventDefault();
    };
    
    dropArea.ondrop = function(evt) {
        // pretty simple -- but not for IE :(
        fileInput.files = evt.dataTransfer.files;
    
        // If you want to use some of the dropped files
        const dT = new DataTransfer();
        dT.items.add(evt.dataTransfer.files[0]);
        fileInput[0] = dT.files;
    
        evt.preventDefault();
        previewDroppedImage(fileInput.files[0]);
    };



    function previewDroppedImage(file){
        const ingresarImagenes = document.getElementById("ingresarImagenes");
        const redo = document.getElementById("redo");
        const previewContainer = document.getElementById("previews");        
        const previewImage = previewContainer.querySelector(".img-preview__image");
        const previewDefaultText = previewContainer.querySelector(".img-preview__default-text");
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
    }
});