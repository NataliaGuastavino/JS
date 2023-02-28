// Capturo los elementos necesarios para el JS 
let actividadesDiv = document.getElementById ("actividades")
let guardarActBtn = document.getElementById ("guardarActBtn")
let inputBuscador = document.querySelector ("#buscador")
let coincidencia = document.getElementById ("coincidencia")
let selectOrden = document.getElementById ("selectOrden")
let modalBodyCarrito = document.getElementById ("modal-bodyCarrito")
let botonCarrito = document.getElementById ("botonCarrito")
let precioTotal = document.getElementById ("precioTotal")
let loaderTexto = document.getElementById ("loaderTexto")
let loader = document.getElementById ("loader")
let hora = document.getElementById ("hora")
let botonFinalizarCompra = document.getElementById ("botonFinalizarCompra")


// Array productos en carrito:
let actividadesEnCarrito = []
if (localStorage.getItem ("carrito")){   
    for (let actividad of JSON.parse(localStorage.getItem ("carrito"))){
        //Capturo la cantidad de unidades del storage
        let cantStorage = actividad.cantidad
        //Instancio act. para no perder la clase y, le paso el método. 
        let actividadStorage = new Actividad (actividad.id, actividad.nombreActividad, actividad.costo, actividad.imagen)
        //Vuelvo a imprimir el atributo cantidad con la variable que me guarda la cant. storage
        actividadStorage.cantidad = cantStorage
        actividadesEnCarrito.push (actividadStorage)
    }
}else {
    actividadesEnCarrito = []
    localStorage.setItem("carrito", actividadesEnCarrito)
}

// Array productos en carrito: operador ||
//let actividadesEnCarrito = JSON.parse(localStorage.getItem ("carrito")) || []

// Operador Nullish
let busquedaNullish = listaActividades.find ((act) => act.nombreActividad == "Sagrada Familia") ?? "Actualmente no contamos con esa actividad"

// FUNCTIONS:

// Creo la función:
function mostrarActividades (array) {

// Reseteo el div para que no se vuelva a imprimir:
actividadesDiv.innerHTML = ""

// Imprimo los objetos en el DOM:
for (let actividad of array) {

// Código para imprimir el array de actividades
// Creo un div padre de la card
let nuevaActividadDiv = document.createElement ("div")
nuevaActividadDiv.className = "col-12 col-md-6 col-lg-4 my-3"

// Le sumo html:
nuevaActividadDiv.innerHTML = `
    <div id= "${actividad.id}" class="card" style="width: 25rem;">
        <img src="img/${actividad.imagen}" class="card-img-top img-fluid" style="height: 300px"  alt="${actividad.nombreActividad}">
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
    debugger
    let actividadInput = document.getElementById ("actividadInput")
    let costoInput = document.getElementById ("costoInput")

// Function constructora:
const nuevaActividad = new Actividad (array.length+1, actividadInput.value, parseInt(costoInput.value), "nuevaBcn.jpg")

// Agrego el nuevo producto al array de productos:
array.push (nuevaActividad)
    
// Guardo en el storage:
localStorage.setItem ("listaActividades", JSON.stringify (array))
    mostrarActividades (array)

let formAgregarAct = document.getElementById ("formAgregarAct")

formAgregarAct.reset ()

//Agrego toastify:
Toastify ({
    text: `La actividad ${nuevaActividad.nombreActividad} ha sido agregada al stock`,
    duration: 2500,
    gravity: `right`,
    style: {
        background: "linear-gradient (to right, #4D5940) ",
        color: "white"
    },
    onClick: function (){}
    }).showToast ();
}

// Function búsqueda - con operador ternario:
function buscarInfo (buscado, array){
    
    let busquedaArray = array.filter(
        (actividad)=> actividad.nombreActividad.toLowerCase().includes(buscado.toLowerCase())
    )
    busquedaArray.length == 0 ? (coincidencia.innerHTML = `<h3>No se encuentran coincidencias con su búsqueda</h3>`, 
    mostrarActividades (busquedaArray)) : ( coincidencia.innerHTML = "", mostrarActividades (busquedaArray))
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
        //Sweet alert: para experiencia del usuario
        Swal.fire ({
            title: `¡Ha agregado una actividad al carrito!`,
            text: `La actividad ${actividad.nombreActividad} ha sido agregada al carrito`,
            icon: "info",
            confirmButtonText: "Muchas gracias!",
            confirmButtonColor: "#4D5940",
            timer: 3000, 
            imageUrl: `img/${actividad.imagen}`,
            imageHeight: 200

        })
    }else {
        // El producto se encuenta en el carrito:
        console.log (`La actividad ${actividad.nombreActividad} ya se encuentra en el carrito`)
        
        //Sweet alert: para experiencia del usuario
        Swal.fire ({
            text: `La actividad ${actividad.nombreActividad} ya ha sido agregada al carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }
}

// Function: agregar nuevas actividades
function cargarProductosCarrito (array){
    modalBodyCarrito.innerHTML = ""
    array.forEach ((productoCarrito) =>{
        modalBodyCarrito.innerHTML += `
    <div id= "productoCarrito${productoCarrito.id}" class="card" style="max-width: 450px;">
        <img src="img/${productoCarrito.imagen}" class="card-img-top img-fluid" style="height: 250px"  alt="${productoCarrito.nombreActividad}">
        <div class="card-body">
            <h4 class="card-title">${productoCarrito.nombreActividad}</h4>

            <p class="card-price"> Costo unitario: ${productoCarrito.costo}€ </p>
            <p class="card-price"> Total de unidades: ${productoCarrito.cantidad} </p>
            <p class="card-price"> Sub Total: ${productoCarrito.costo * productoCarrito.cantidad} </p>

            <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>
            <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button> 

            <button class = "btn btn-danger" id="botonEliminar ${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div> `
    })
    // Segundo forEach: para agregar functions: eliminar producto del carrito, sumar y restar unidad/es del carrito
    array.forEach ((productoCarrito)=>{
        //Function: boton eliminar
        document.getElementById(`botonEliminar ${productoCarrito.id}`).addEventListener ("click", ()=>{
            //Borrar del DOM
            let cardProducto = document.getElementById (`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            //Eliminar la card del array: busco el producto a eliminar
            let productoEliminar = array.find (actividad => actividad.id == productoCarrito.id)
            //Busco el indice para eliminar
            let posicion = array.indexOf (productoEliminar)
            //Splice:
            array.splice (posicion, 1)
            //Eliminar del storage
            localStorage.setItem ("carrito", JSON.stringify (array))
            //Recalcular el total
            compraTotal (array)
        })
        //Sumar unidad al carrito
        document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", ()=>{
            productoCarrito.sumarUnidad()
            localStorage.setItem("carrito", JSON.stringify (array))
            cargarProductosCarrito(array)
        })
        //Restar unidad al carrito
        document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", ()=>{
            let cantidad = productoCarrito.restarUnidad()
            if (cantidad < 1){
                let cardProducto = document.getElementById (`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let posicion = array.indexOf (productoCarrito)
                array.splice (posicion, 1)
                localStorage.setItem("carrito", JSON.stringify (array))
                compraTotal(array)
            }else {
                localStorage.setItem("carrito", JSON.stringify (array))
            }
            cargarProductosCarrito(array)
        })
    })
    compraTotal (array)
}

// Function: calcular compra total

function compraTotal (array){
// Acumulador con reduce:
let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.costo * productoCarrito.cantidad) ,0)
// Ternario para mostrar en html:
total == 0 ?
precioTotal.innerHTML = `No hay productos agregados` :
precioTotal.innerHTML = `El total de la compra es ${total}€`
    return total
}

function finalizarCompra (array){
    Swal.fire({
        title: '¿Está seguro de realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: '#4D5940',
        cancelButtonColor: '',
    }).then ((result)=>{
        if (result.isConfirmed){
            let totalFinalizar = compraTotal (array)
        Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: '#4D5940',
            text: `Muchas gracias por su compra! Usted ha adquirido nuestras actividades por un total de ${totalFinalizar}€`,
            })
            // Reseteo el carrito para que vuelva a 0
            actividadesEnCarrito = []
            localStorage.removeItem ("carrito")
        }else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Sus productos continuan en el carrito.`,
                confirmButtonColor: '#4D5940',
                timer:3500
            })
        }
    })
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

botonFinalizarCompra.addEventListener ("click", ()=>{
    finalizarCompra (actividadesEnCarrito)
})

// Código:
setTimeout (()=>{
    loaderTexto.innerText = ""
    loader.remove ()
    mostrarActividades (listaActividades)
},1000)

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

//DESESTRUCTURACIÓN
let {nombreActividad, costo} = sagradaFamilia
console.log (nombreActividad)
console.log (costo)


//Luxon:


function cargaActividades (resultado){
    return new Promise ((res, rej)=>{
        if (resultado == true){
            setTimeout (()=>{
                res (listaActividades)
            },2000)
        }else {
            setTimeout(()=>{
                rej ("No se han podido cargar las actividades")
            },1000)
        }
    })
}
cargaActividades (true)
.then ((respuesta)=>{
    console.log ("Tu cátalogo es:")
    console.log (respuesta)
})
.catch ((err)=>{
    console.log(err)
})
.finally (()=>{
    console.log ("La carga de actividades ha finalizado")
})