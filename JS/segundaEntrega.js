let nombre = prompt("Bienvenido a su agencia de turismo. Por favor, ingrese su nombre.")
let destino = (alert("Bienvenido/a " + nombre + "."))


// Creo mi función para ver las actividades disponibles:
function verActividades (array) {
    console.log("Nuestra agencia de turismo ofrece las siguientes actividades:")
    alert (`Nuestra agencia de turismo ofrece las siguientes actividades:
    ${array.map ( act => { return `
        ${act.id} - ${act.nombreActividad}, cuyo costo es € ${act.costo}` }).join ('')} `)
    array.forEach (
        (act) => {console.log(`${act.id} - ${act.nombreActividad}, cuyo costo es € ${act.costo}`)
        }
    )
}    

// Creo una función para agregar nuevas actividades:
function agregarActividad (array){
    let nombreActividad = prompt (`Ingrese el nombre de la actividad que desea agregar`)
    let costoActividad = prompt (`Ingrese el costo de la nueva actividad`)

    // Válido que el precio ingresado sea un número:
    while(isNaN(costoActividad)){
        costoActividad = prompt(`El valor ingresado no es un número válido. Por favor, ingrese un precio en números`)
    }
    // Construyo el nuevo producto en base a los parámetros ingresados por el usuario:
    const nuevaActividad = new Actividad (array.length+1, nombreActividad, costoActividad)
    // Agrego el nuevo producto al array de productos:
    array.push (nuevaActividad)

    // Consultar el catálogo. En caso de no elegir que se muestre, informo que el producto se agregó correctamente.
    let opcionActividad = prompt(`¿Desea consultar el catálogo actualizado?
    1 - Sí
    2 - No`)
    switch(opcionActividad){
        case "1":
        verActividades (listaActividades)
        break
        case "2":
        alert(`La actividad ${nuevaActividad.nombreActividad} fue agregada a la lista exitosamente`)
        break
        default:
        alert(`La actividad ${nuevaActividad.nombreActividad} fue agregada a la lista exitosamente`)            
        break
    }
}

// Creo funciones para ordenar el array de actividades:
// Por precio: de menor a mayor
function precioMenorMayor (array){
    // Hago una copia del array
    let menorMayor = [].concat(array)
    //Ordeno con método Sort
    menorMayor.sort((a, b) => a.costo - b.costo)
    verActividades (menorMayor)
}

// Por precio: de mayor a menor
function precioMayorMenor(array){
    // Hago una copia del array
    let mayorMenor = [].concat(array)
    // Ordeno con método Sort
    mayorMenor.sort((a, b) => b.costo - a.costo)
    verActividades (mayorMenor)
}

// Alfabéticamente:
function ordenarAlfabeticamente (array){
    // Hago una copia del array
    let ordenAlfa = [].concat(array)
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
    console.log (verActividades (ordenAlfa))
}

// Creo una función para preguntarle al usuario qué método desea utilizar para ordenar el array de productos:
function ordenarActividades (array){
    let actividadesOrdenadas = (prompt (`Indique cómo desea ordenar las actividades
    1 - Por precio de menor a mayor
    2 - Por precio de mayor a menor
    3 - Por orden alfabético`))

    switch(actividadesOrdenadas){
        case "1":
        precioMenorMayor (array)
        break
        case "2":
        precioMayorMenor (array)
        break
        case "3":
        ordenarAlfabeticamente (array)
        break
        default:
        alert (`La opción no es válida. Por favor, vuelva a intentarlo`)
        break
    }
}

// Creo una función para eliminar actividades del array:
function borrarAct (array){
    // Muestro el catálogo
    verActividades (array)
    // Guardo la opción seleccionada por el usuario en una variable
    let idEliminar = parseInt (prompt(`Seleccione la actividad a eliminar`))
    // Valido que la opción ingresada sea un número
    while(isNaN(idEliminar)){
        idEliminar = prompt(`La opción ingresada es incorrecta. Por favor, ingrese un número del listado.`)
    }
    // Valido que el producto a eliminar exista
    while(idEliminar > array.length){
        idEliminar = prompt(`Producto inexistente. Ingrese un producto del catálogo`)
    }
    // Map: 
    let arrayId = array.map(a => a.id)
    // Creo una variable que registre el index del id elegido
    let indice = arrayId.indexOf(idEliminar)
    // Splice:
    array.splice(indice, 1)
    // muestro el catálogo modificado
    alert (`El producto ${idEliminar} fue eliminado exitosamente.`)
    verActividades (array)
}

// Creo una función para buscar actividades:
function buscarAct(array){
    let actBuscada = prompt (`Ingrese la actividad que desea encontrar:`)
    let actBuscar = array.filter((act) => act.nombreActividad.toLowerCase() == actBuscada.toLowerCase())
    if(actBuscar.length == 0){
        alert(`No tenemos ${actBuscada} en nuestra lista de actividades`)
    } else {
        verActividades(buscarAct)
    }
}

// Creo mi función de menú para realizar tareas interactivas con el usuario:
function menu(){
let salirMenu = true
do {
    let elegirUsuario = prompt(` ${nombre} por favor, indique si es empleado o cliente:
    1 - Empleado
    2 - Cliente
    3 - Salir del menú`)

    switch (elegirUsuario){
        case "1": 
            let menuEmpleado = prompt(`${nombre} usted ingresó como empleado. Seleccione la operación que desea realizar:
            1 - Consultar actividades.
            2 - Agregar una nueva actividad.
            3 - Ordenar actividades.
            4 - Eliminar una actividad`)

            switch(menuEmpleado){
                case "1": 
                    verActividades (listaActividades)
                break

                case "2": 
                    agregarActividad (listaActividades)
                break

                case "3": 
                    ordenarActividades (listaActividades)
                break

                case "4": 
                    borrarAct (listaActividades)
                break

                default:
                    alert(`La opción ingresada no es válida. Vuelva a intentarlo desde el principio`)
                break
            }
        break

        case "2": 
            let menuCliente = prompt(`${nombre} usted ingresó como cliente. Elija qué operación desea realizar:
            1 - Ver actividades
            2 - Buscar actividades
            3 - Agregar actividades al carrito
            4 - Ordenar actividades
            5 - Finalizar compra`)

            switch (menuCliente){

                case "1":
                    verActividades (listaActividades)
                break

                case "2":
                    buscarAct (listaActividades)
                break

                case "3":
                    agregarActividad (listaActividades)
                break
                
                case "4":
                    ordenarActividades (listaActividades)
                break

                case "5":
                    alert(`¡Muchas gracias por haber confiado en nuestra agencia de turismo!`)
                break

                default:
                    console.log(`Opción no válida`)
                break
            }
            break

        case "3":
            alert ("Muchas gracias por utilizar nuestra página de turismo!")
            salirMenu = false
        break

        default:
            alert ("Opción no válida. Por favor, seleccione una nueva opción")
        break
        } 
    }
    while (salirMenu) 
}
menu ()

// TERCERA ENTREGA:
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

// Array productos en carrito:
let actividadesEnCarrito 
if (localStorage.getItem ("carrito")){
    actividadesEnCarrito = JSON.parse(localStorage.getItem ("carrito"))
}else {
    actividadesEnCarrito = []
    localStorage.setItem("carrito", actividadesEnCarrito)
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
    }

    // Instanciación de los primeros objetos de productos:
const campNou = new Actividad (1, "Camp Nou", 70, "campNou.jpg" )
const casaBattlo = new Actividad (2, "Casa Battló", 60, "casaBattlo.jpg")
casaMila = new Actividad (3, "Casa Milá", 40, "casaMila.jpg")
Tibidabo = new Actividad (4, "Tibidabo", 50, "tibidabo.jpg")
const parkGuell = new Actividad (5, "Park Guell", 30, "parkGuell.jpg")
const sagradaFamilia = new Actividad (6, "Sagrada Familia", 90, "sagradaFamilia.jpg")


// Creo el array de actividades y pusheo los objetos ya existentes:
let listaActividades = []
//1. Condicional que evalúe si hay algo cargado:
if (localStorage.getItem(listaActividades)){
    // Si existe algo en el storage entra al if.
    // listaActividades = JSON.parse(localStorage.getItem ("listaActividades"))
    // Vuelvo a instanciar con la class
    for (let actividad of JSON.parse(localStorage.getItem ("listaActividades"))) {
        let storageActividad = new Actividad (actividad.id, actividad.nombreActividad, actividad.costo, actividad.imagen)
        console.log (storageActividad)
        listaActividades.push (storageActividad)
    }
} else {
    // Si no existe entra al else
    listaActividades.push (campNou, casaBattlo, casaMila, Tibidado, parkGuell, sagradaFamilia)
    localStorage.setItem("listaActividades", JSON.stringify(listaActividades))
}

// Luxon:
const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

//SPREAD con objetos: Para agregarle parametros a un objeto ya existente
let superLibro4 = {
libro4,
cantPag: 875,
editorial: "Sudamericana"
}
