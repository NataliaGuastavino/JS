// Capturo los elementos necesarios para el JS 
let actividadesDiv = document.getElementById ("actividades")
let guardarActBtn = document.getElementById ("guardarActBtn")
let inputBuscador = document.querySelector ("#buscador")
let coincidencia = document.getElementById ("coincidencia")
let selectOrden = document.getElementById ("selectOrden")
let modalBodyCarrito = document.getElementById ("modal-bodyCarrito")
let botonCarrito = document.getElementById ("botonCarrito")
let precioTotal =document.getElementById ("precioTotal")

// Array productos en carrito:
let actividadesEnCarrito 
if (localStorage.getItem ("carrito")){
    actividadesEnCarrito = JSON.parse(localStorage.getItem ("carrito"))
}else {
    actividadesEnCarrito = []
    localStorage.setItem("carrito", actividadesEnCarrito)
}

// FUNCTIONS:

// Creo la función:
function mostrarActividades (array) {

// Reseteo el div para que no se vuelva a imprimir:
actividadesDiv.innerHTML =""

// Imprimo los objetos en el DOM:
for (let actividad of array) {

// Código para imprimir el array de actividades
// Creo un div padre de la card
let nuevaActividadDiv = document.createElement ("div")
nuevaActividadDiv.className = "col-12 col-md-6 col-lg-4 my-3"

// Le sumo html:
nuevaActividadDiv.innerHTML = `
    <div id= ${actividad.id} class="card" style="width: 18rem;">
        <img src="img/${actividad.imagen}" class="card-img-top img-fluid" style="height: 200px"  alt="${actividad.nombreActividad}">
        <div class="card-body">
            <h4 class="card-title">${actividad.nombreActividad}</h4>
            <p class="card-price"> Costo: ${actividad.costo}€ </p>
            <a href="#" id="agregarBtn ${actividad.id}" class="btn btn-outline-primary">Agregar al carrito</a>
        </div>
    </div> `

    actividadesDiv.appendChild (nuevaActividadDiv)

    let agregarBtn = document.getElementById (`agregarBtn ${actividad.id}`)
    agregarBtn.onclick = ()=> {

    agregarAlCarrito (actividad)
        } 
    }
}

// Creo una función para agregar nuevas actividades:
function cargarActividad (array){
    let actividadInput = document.getElementById ("actividadInput")
    let costoInput = document.getElementById ("costoInput")

// Function constructora:
const nuevaActividad = new Actividad (array.length+1, actividadInput.value, parseInt(costoInput.value), "nuevaBcn.jpg")

// Agrego el nuevo producto al array de productos:
array.push (nuevaActividad)
    
// Guardar en storage:
localStorage.setItem ("listaActividades", JSON.stringify (array))
    mostrarActividades (array)

let formAgregarAct = document.getElementById ("formAgregarAct")

formAgregarAct.reset ()
}


// Function: búsqueda
function buscarInfo (buscado, array){
    
    let busquedaArray = array.filter(
        (actividad)=> actividad.nombreActividad.toLowerCase().includes(buscado.toLowerCase())
    )
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3>No se encuentran coincidencias con su búsqueda</h3>`
        mostrarActividades (busquedaArray)
    }else{
        coincidencia.innerHTML = ""
        mostrarActividades (busquedaArray)
    }
}

// Creo funciones para ordenar el array de actividades:
// Por precio: de menor a mayor
function precioMenorMayor (array){
    // Hago una copia del array
    const menorMayor = [].concat(array)
    //Ordeno con método Sort
    menorMayor.sort((a, b) => a.costo - b.costo)
    mostrarActividades (menorMayor)
}

// Por precio: de mayor a menor
function precioMayorMenor(array){
    // Hago una copia del array
    const mayorMenor = [].concat(array)
    // Ordeno con método Sort
    mayorMenor.sort((a, b) => b.costo - a.costo)
    mostrarActividades (mayorMenor)
}

// Alfabéticamente:
function ordenarAlfabeticamente (array){
    // Hago una copia del array
    const ordenAlfa = [].concat(array)
    //Ordeno con método Sort
    ordenAlfa.sort((a, b) => {
        if (a.nombreActividad > b.nombreActividad) {
        return 1
        }
        if (a.nombreActividad < b.nombreActividad) {
        return -1
        }
        // a es igual b
        return 0
    })
    console.log (mostrarActividades (ordenAlfa))
}
mostrarActividades (listaActividades)

// Function para agregar actividades al carrito:
function agregarAlCarrito (actividad) {
    // Evalúo si el producto existe en el carrito:
    let actividadAgregada = actividadesEnCarrito.find ((elem)=> elem.id == actividad.id)
    if (actividadAgregada == undefined){
        console.log (`La actividad ${actividad.nombreActividad} de costo ${actividad.costo}€ ha sido agregada exitosamente al carrito`)
        // Lo sumo a actividadesEnCarrito
        actividadesEnCarrito.push (actividad)
        // Lo seteo en el storage
        localStorage.setItem ("carrito", JSON.stringify(actividadesEnCarrito))
    }else {
        // El producto se encuenta en el carrito:
        console.log (`La actividad ${actividad.nombreActividad} ya se encuentra en el carrito`)
    }
}

// Function: agregar nuevos productos
function cargarProductosCarrito (array){
    modalBodyCarrito.innerHTML = ""
    array.forEach ((productoCarrito) =>{
        modalBodyCarrito.innerHTML += `
    <div id= ${productoCarrito.id} class="card" style="width: 18rem;">
        <img src="img/${productoCarrito.imagen}" class="card-img-top img-fluid" style="height: 200px"  alt="${productoCarrito.nombreActividad}">
        <div class="card-body">
            <h4 class="card-title">${productoCarrito.nombreActividad}</h4>
            <p class="card-price"> Costo: ${productoCarrito.costo}€ </p>
            <a href="#" id="agregarBtn ${productoCarrito.id}" class="btn btn-outline-primary">Agregar al carrito</a>
        </div>
    </div> `
    })
    compraTotal (array)
}

// Function: calcular compra total
function compraTotal (array){
    let acumulador = 0
    for (let activity of array){
        acumulador = acumulador + activity.costo
    }
    precioTotal.innerHTML = `El precio es ${acumulador}€`
    return acumulador
}

// EVENTOS:
guardarActBtn.addEventListener ("click", ()=>{
        cargarActividad (listaActividades)
    })

// Agrego un evento al input:
inputBuscador.addEventListener ("input", ()=>{
    buscarInfo(inputBuscador.value, listaActividades)
})

// Evento para ordenar productos:
selectOrden.addEventListener ("change", ()=> {
    selectOrden.value
    if (selectOrden.value == "1"){
        precioMayorMenor (listaActividades)
    }else if(selectOrden.value == "2"){
        precioMenorMayor (listaActividades)
    } else if (selectOrden.value == "3"){
        ordenarAlfabeticamente (listaActividades)
    } else {
        mostrarActividades (listaActividades)
    }
})

botonCarrito.addEventListener ("click", ()=>{
    cargarProductosCarrito (actividadesEnCarrito)
})

// -------------------------------------------------------------------------------------------------------------------------------
// Setear un objeto o un array de objetos
// objeto json. Para setear stringify. Para que no me quede un objeto plano, sino que aparezcan los datos
localStorage.setItem ("primerActividad", JSON.stringify (campNou))
localStorage.setItem ("misActividades", JSON.stringify (listaActividades))
//console.log (listaActividades)

//Método que transforme de texto plano a la notación nativa de JS: JSON.parse
console.log (JSON.parse(localStorage.getItem ("misActividades")))
console.log (JSON.parse(localStorage.getItem ("primerActividad")))

// -------------------------------------------------------------------------------------------------------------------------------
//CODIGO
mostrarActividades (listaActividades)




