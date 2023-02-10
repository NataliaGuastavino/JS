// Defino mi clase de productos: class constructora + atributos de la clase
class Actividad{
    constructor (id, nombreActividad, costo, imagen) {
        this.id = id,
        this.nombreActividad = nombreActividad,
        this.costo = costo,
        this.imagen = imagen
       // this.cantidad = 1
    }
}

// Instanciación de los primeros objetos de productos:
const campNou = new Actividad (1, "Camp Nou", 70, "campNou.jpg" )
const casaBattlo = new Actividad (2, "Casa Battló", 60, "casaBattlo.jpg")
const casaMila = new Actividad (3, "Casa Milá", 40, "casaMila.jpg")
const Tibidado = new Actividad (4, "Tibidado", 50, "tibidabo.jpg")
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
//console.log (listaActividades)


