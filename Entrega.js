let nombre = prompt("Bienvenido a su compañía de viajes. Por favor, ingrese su nombre.")

let destino = (alert("Bienvenido/a " + nombre + "."))

let cantidadPersonas = parseInt(prompt("Mencione cuántas personas van a realizar el viaje"))
console.log(`La cantidad de personas que van a viajar son ${cantidadPersonas}`)

let cantidadDias = parseInt(prompt("Mencione la cantidad de días que dispone. Si usted reserva más de 7 dáas, se le aplicará un 10% de descuento en su compra"))

console.log(`La cantidad de días que dispone son ${cantidadDias}. `)
alert(`La cantidad de días que dispone son ${cantidadDias}.`)

function calcularCosto(precioNoche, cantidadDias, cantidadPersonas) {
    if (cantidadDias >= 7) {
        precioTotal = (precioNoche * cantidadDias * cantidadPersonas) * 0.9;
    }
    else {
        precioTotal = (precioNoche * cantidadDias * cantidadPersonas);
    }
    console.log(`El valor de la noche es ${precioNoche}€ , y el costo total de su estadía es de ${precioTotal}€`)
    alert(`El valor de la noche es ${precioNoche}€ , y el costo total de su estadía es de ${precioTotal}€`)
}

function mostrarPaises (pais1, pais2) {
    let pais = prompt(nombre +  `Elija un pais
            1. ${pais1}
            2. ${pais2} `)

    return pais;
}

// Variables
let precioTotal 
let costo
let pais

let salirMenu = true
do {
    let opcionMenu = prompt(nombre + `, mencione su región de salida
    1 - Centro América
    2 - América del Norte y del Sur
    3 - Europa
    0 - Salir Menú `)

    switch (opcionMenu) {
        case "1":
            console.log("Centro América")
            pais = mostrarPaises('Cuba', 'Mexico')
            switch (pais) {
                case "1":
                    costo = calcularCosto(50, cantidadDias, cantidadPersonas)
                break
                case "2":
                    costo = calcularCosto(70, cantidadDias, cantidadPersonas)
                break
            }  
            break
        case "2":
            console.log("América del Norte y del Sur")
            pais = mostrarPaises('Brasil', 'Estados Unidos')
            switch (pais) {
                case "1":
                    costo = calcularCosto(40, cantidadDias, cantidadPersonas)
                break
                case "2":
                    costo = calcularCosto(80, cantidadDias, cantidadPersonas)
                break
            }  
            break
        case "3":
            console.log("Europa")
            pais = mostrarPaises('España', 'Grecia')
            switch (pais) {
                case "1":
                    costo = calcularCosto(90, cantidadDias, cantidadPersonas)
                    break
                case "2":
                    costo = calcularCosto(70, cantidadDias, cantidadPersonas)
                break
            }  
            break
        case "0":
            console.log("Salir Menú")
            alert(`¡Muchas gracias por utilizar nuestra página!`)
            salirMenu = false
            break
        default:
            console.log("Opción no válida")
            break
    }
} while (salirMenu)