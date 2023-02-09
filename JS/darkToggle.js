// Dark Toggle:
let btnToggle = document.getElementById ("toggleMode")

if (localStorage.getItem ("modoOscuro")){
    if (JSON.parse (localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = `Light`
        btnToggle.className = `btn btn-light`
    }

}else {
    localStorage.setItem("modoOscuro", false)
}

btnToggle.addEventListener ("click", ()=> {
    //Toggle: agrega y quita la clase
    document.body.classList.toggle("darkMode")

    if (JSON.parse (localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = `Light`
        btnToggle.className = `btn btn-light`
        localStorage.setItem ("modoOscuro", true)
        }else {
            btnToggle.innerText = `Dark`
            localStorage.setItem ("modoOscuro", false)
        }
    })

    

    // Dark mode: Versión anterior
//let botonDarkMode = document.getElementById ("botonDarkMode")
//let botonLightMode = document.getElementById ("botonLightMode")
//let eliminarMode = document.getElementById ("eliminarMode")

// Capturo la información del local storage:
//let modoOscuro = JSON.parse(localStorage.getItem ("modoOscuro"))
//console.log (modoOscuro)

//Condicional que preguente por el valor de la clave modoOscuro, y según el valor, ponga en el sitio: modo claro/oscuro
//if (modoOscuro == "true") {
//   document.body.classList.add ("addMode")
//}
//botonDarkMode.addEventListener ("click", ()=>{
//   console.log ("Btn oscuro funciona")
// Classlist add
//  document.body.classList.add ("addMode")
//Para que se guarde en el storage:
//   localStorage.setItem ("modoOscuro", true)
//})

//botonLightMode.addEventListener ("click", ()=>{
//   console.log ("Btn claro funciona")
// document.body.classList.remove ("darkMode")
//  localStorage.setItem ("modoOscuro", false)
//})

//eliminarMode.addEventListener ("click", ()=>{
// Remuevo la clave y su valor. Se elimina
//   localStorage.removeItem ("modoOscuro")
//})