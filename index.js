document.addEventListener("DOMContentLoaded", () => {
    const formularioJS = document.querySelector(".myForm");
    const inputTituloJS = document.querySelector(".myInputTitulo");
    const inputPublicacionJS = document.querySelector("#myTextareaPublicacionID");
    const divRegistroPadreJS = document.querySelector(".myPublicacionesRegistro");
    const divRegistroHijoJS = document.querySelector(".myPublicacionesRegistroChicas");
    

    let baseDatosLocal = JSON.parse(localStorage.getItem("formData")) || [];

    formularioJS.addEventListener("submit", function(e) {
        e.preventDefault();

        const valorTitulo = inputTituloJS.value;
        const valorPublicacion = inputPublicacionJS.value;

        if(valorTitulo && valorPublicacion) {
            const valorAmbosDatos = {valorTitulo,valorPublicacion};
            baseDatosLocal.push(valorAmbosDatos);
            salvarDatosToLocalStorage();
            renderPublicacion();
            formularioJS.reset();
        } else {
            alert("Debe llenar todos los datos")
        }
    })

    function salvarDatosToLocalStorage() {
        localStorage.setItem("formData",JSON.stringify(baseDatosLocal));
    }

    function renderPublicacion() {
        divRegistroPadreJS.innerHTML = "";
        divRegistroHijoJS.innerHTML = "";

        baseDatosLocal.forEach(function (key, valor){
            const btnEditar = document.createElement("button");
            const btnEliminar = document.createElement("button");
            const contenedorBtns = document.createElement("div");
            const articuloTitulo = document.createElement("div");
            const articuloPublicacion = document.createElement("div");
            const contenedorPublicacion = document.createElement("div");

            contenedorBtns.className = "myContenedorBtns";
            articuloTitulo.className ="myContenedorRegistroTitulo";
            btnEditar.className ="myBtnEditar";
            btnEliminar.className ="myBtnEliminar";
            articuloPublicacion.className ="myContenedorRegistroPublicacion";
            contenedorPublicacion.className = "myContenedorDePost";

            articuloTitulo.textContent = key.valorTitulo;
            articuloPublicacion.textContent = key.valorPublicacion;
            btnEliminar.textContent = "Eliminar";
            btnEditar.textContent = "Editar";

            btnEditar.addEventListener("click", function(){
                btnEditarDatos(valor);
            })
           
            btnEliminar.addEventListener("click", function(){
                btnEliminarDatos(valor);
            })

            divRegistroPadreJS.prepend(contenedorPublicacion);
            contenedorPublicacion.appendChild(articuloTitulo);
            contenedorPublicacion.appendChild(articuloPublicacion);
            contenedorPublicacion.appendChild(contenedorBtns);
            contenedorBtns.appendChild(btnEditar);
            contenedorBtns.appendChild(btnEliminar);
        })
    }

    function btnEditarDatos(valor){
        const key1 = baseDatosLocal[valor];
        inputTituloJS.value = key1.valorTitulo;
        inputPublicacionJS.value = key1.valorPublicacion;
        baseDatosLocal.splice(valor, 1);
        salvarDatosToLocalStorage();
        renderPublicacion();
    } 
    

    function btnEliminarDatos(valor){
        baseDatosLocal.splice(valor, 1);
        salvarDatosToLocalStorage();
        renderPublicacion();
    }

    renderPublicacion();


}) 