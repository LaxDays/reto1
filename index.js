// Hacemos que la carga espere.
document.addEventListener("DOMContentLoaded", () => {

// Llamamos nuestros querys para trabajar con ellos.
    const formularioJS = document.querySelector(".myForm");
    const inputTituloJS = document.querySelector(".myInputTitulo");
    const inputPublicacionJS = document.querySelector("#myTextareaPublicacionID");
    const divRegistroPadreJS = document.querySelector(".myPublicacionesRegistro");
    const divRegistroHijoJS = document.querySelector(".myPublicacionesRegistroChicas");
    
// Creamos la variable que parsea y obtiene los datos del Local Storage, si no, la crea.
    let baseDatosLocal = JSON.parse(localStorage.getItem("formData")) || [];

// Creamos  la interacción al darle click a "publicar".
    formularioJS.addEventListener("submit", function(e) {

// Previene que el navegador actue "normalmente".
        e.preventDefault();

// Le pasamos los valores de título y publicación a dos constantes para trabajarlas.
        const valorTitulo = inputTituloJS.value;
        const valorPublicacion = inputPublicacionJS.value;

// Sí el valor de input y publicación contienen algo, le entramos.
// if crea una constante para almacenar el obj de lo que vale titulo y publicacion (ambos en una),
//      para despues hacerle push a la base de datos.
// Se llaman las funciones funcionadoras salvarDatosToLocalStorage y renderPublicacion.
// El formulario se puede vaciar con el reset ahora si.
// else esta ahí por si alguno de los espacios esta vacio.
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

// Toma los datos, los transforma en string y los guarda en el local storage
    salvarDatosToLocalStorage = () => {
        localStorage.setItem("formData",JSON.stringify(baseDatosLocal));
    }

/*
Se encarga de:
1. Limpiar lo publicado actualmente.
2. Crear botones y divs.
3. Darle clases a los botones y divs.
4. Colocar el texto con textContent a publicación y título. Así como escribir dentro de los botones.
5. Hacer la escucha de las funciones editar y eliminar.
6. Colocar todo con append.
*/
    renderPublicacion = () => {
        divRegistroPadreJS.innerHTML = "";
        divRegistroHijoJS.innerHTML = "";

        baseDatosLocal.forEach((key, valor) => {
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

            btnEditar.addEventListener("click", () => {
                btnEditarDatos(valor);
            })
           
            btnEliminar.addEventListener("click", () => {
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

/*
a) Entra a local para tomar el valor del array.
b) El valor de titulo se comola en el input donde va el titulo.
c) El valor de publicación se coloca donde va la publicación.
d) splice elimina lo que estaba antes.
e) se llama función salvarDatosToLocalStorage para guardar datos nuevos.
f) se llama función renderPublicacion para pulblicar los datos nuevos.
*/
    btnEditarDatos = (valor) => {
        const key1 = baseDatosLocal[valor];
        inputTituloJS.value = key1.valorTitulo;
        inputPublicacionJS.value = key1.valorPublicacion;
        baseDatosLocal.splice(valor, 1);
        salvarDatosToLocalStorage();
        renderPublicacion();
    } 
    
/*
Se ingresa a la base de datos y se elimina con Splice
e) se llama función salvarDatosToLocalStorage para guardar datos nuevos.
f) se llama función renderPublicacion para pulblicar los datos nuevos.
*/
    btnEliminarDatos = (valor) => {
        baseDatosLocal.splice(valor, 1);
        salvarDatosToLocalStorage();
        renderPublicacion();
    }

    inputBusqueda.addEventListener("input", function() {
        const valorBusqueda = inputBusqueda.value.toLowerCase();

        const publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
            return publicacion.valorTitulo.toLowerCase().includes(valorBusqueda) 
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