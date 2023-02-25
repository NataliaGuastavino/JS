// Defino mi clase de productos: class constructora + atributos de la clase
class Actividad{
    constructor (id, nombreActividad, costo, imagen) {
        this.id = id,
        this.nombreActividad = nombreActividad,
        this.costo = costo,
        this.imagen = imagen,
        this.cantidad = 1
    }

    // Métodos:
    sumarUnidad (){
        this.cantidad += 1
    }
    restarUnidad (){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}

// Creo el array de actividades y pusheo los objetos ya existentes:
let listaActividades = []

const cargarActividades = async () => {
    const response = await fetch ("actividades.json")
    const data = await response.json ()
    for (let actividad of data){
        let actividadNueva = new Actividad (actividad.id, actividad.nombreActividad, actividad.costo, actividad.imagen)
        listaActividades.push (actividadNueva)
    }
    localStorage.setItem("listaActividades", JSON.stringify(listaActividades))
}

// Creo un condicional que evalúe si hay algo cargado:
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
    cargarActividades ()
}



