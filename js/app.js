
const carrito = document.querySelector("#carrito")
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrtios = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
let articulosCarrito = [];

cargaerEventListeners();
function cargaerEventListeners() {
    // cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //elimina cursos del carrtio
    carrito.addEventListener("click",eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito =[]
        limpiarHTML()
    })
}

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }

}

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        let cursoId = e.target.getAttribute('data-id') 

        // //elimina del arreglo 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML() //iterar sobre el carrito y mostrar su HTML
    }
}
//lee contenido html
function leerDatosCurso(curso) {
    console.log(curso);

    const infoCurso = {
        id: curso.querySelector("a").getAttribute("data-id"),
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        cantidad: 1,

    }


    //Revisa si el elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //si existe actualiza la cantidad

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna objeto actualizado
            } else {
                return curso; //retorna todos los demas objetos
            }
        })
        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]

    }


    // console.log(infoCurso);
    //Agrega elementos al articulo de carritos

    console.log(articulosCarrito);
    carritoHTML()
}
//Muestra el carrito de compras en el html


function carritoHTML() {

    //limpiar html
    limpiarHTML();


    //recorre carrito
    articulosCarrito.forEach((curso) => {

        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
    <td><img src="${imagen}" width="100"/> </td> 
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td> 
    <td>
    <a href="#"  class="borrar-curso" data-id=${id}> x </a>
    </td>   
    `;

        contenedorCarrtios.appendChild(row)

    })
}


//eliminar cursos de tbody
function limpiarHTML() {
    //forma lenta
    contenedorCarrtios.innerHTML = '';

    //Forma rapida
    // while (contenedorCarrtios.firstChild) {
    //     contenedorCarrtios.removeChild(contenedorCarrtios.firstChild)
    // }
}



// <div>
//     <p>1</p>
//     <p>2</p>
//     <p>3</p>
// </div>