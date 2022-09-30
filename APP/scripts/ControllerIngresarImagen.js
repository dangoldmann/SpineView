document.addEventListener("DOMContentLoaded", ()=>{
    var form = document.getElementById("ingresarImagenes");
    var fileInput = document.getElementById("imgInput");
    var dropArea = document.getElementById("ingresarImagenes")

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
});