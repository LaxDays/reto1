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

    inputBusqueda.addEventListener("input", function() {
        const valorBusqueda = inputBusqueda.value.toLowerCase();

        const publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
            return publicacion.valorTitulo.toLowerCase().includes(valorBusqueda);
        });

        // Renderizar las publicaciones filtradas
        divRegistroPadreJS.innerHTML = "";
        publicacionesFiltradas.forEach(publicacion => {

            const contenedorPublicacion = document.createElement("div");
            contenedorPublicacion.className = "myContenedorDePost";
            const articuloTitulo = document.createElement("div");
            articuloTitulo.className ="myContenedorRegistroTitulo";
            articuloTitulo.textContent = publicacion.valorTitulo;
            contenedorPublicacion.appendChild(articuloTitulo);
            divRegistroPadreJS.appendChild(contenedorPublicacion);

            const articuloPublicacion = document.createElement("div");
            articuloPublicacion.className ="myContenedorRegistroPublicacion";
            articuloPublicacion.textContent = publicacion.valorPublicacion;
            contenedorPublicacion.appendChild(articuloPublicacion);
            divRegistroPadreJS.appendChild(contenedorPublicacion);
        });

    });

    selectFiltroFecha.addEventListener("change", function() {
        const filtro = selectFiltroFecha.value;

        let publicacionesFiltradas = [];

        switch(filtro) {
            case 'semana':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const unaSemanaAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
                    return publicacionesFiltradas = baseDatosLocal;
                });
                break;
            case 'mes':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const esteMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                    return fechaPublicacion >= esteMes;
                });
                break;
            case 'ano':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const esteAno = new Date(hoy.getFullYear(), 0, 1);
                    return fechaPublicacion >= esteAno;
                });
                break;
            default:
                publicacionesFiltradas = baseDatosLocal;
                break;
        }

        // Renderizar las publicaciones filtradas
        divRegistroPadreJS.innerHTML = "";
        publicacionesFiltradas.forEach(publicacion => {
            const contenedorPublicacion = document.createElement("div");
            contenedorPublicacion.className = "myContenedorDePost";
            const articuloTitulo = document.createElement("div");
            articuloTitulo.className ="myContenedorRegistroTitulo";
            articuloTitulo.textContent = publicacion.valorTitulo;
            contenedorPublicacion.appendChild(articuloTitulo);
            divRegistroPadreJS.appendChild(contenedorPublicacion);

            const articuloPublicacion = document.createElement("div");
            articuloPublicacion.className ="myContenedorRegistroPublicacion";
            articuloPublicacion.textContent = publicacion.valorPublicacion;
            contenedorPublicacion.appendChild(articuloPublicacion);
            divRegistroPadreJS.appendChild(contenedorPublicacion);
        });
    });

    renderPublicacion();


}) 