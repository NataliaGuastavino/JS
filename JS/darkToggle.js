// Dark Toggle:
let btnToggle = document.getElementById ("toggleMode")

if (localStorage.getItem ("modoOscuro")){
    if (JSON.parse (localStorage.getItem("modoOscuro")) == true){
    }

}else {
    localStorage.setItem("modoOscuro", false)
}

btnToggle.addEventListener ("click", ()=> {
    //Toggle: agrega y quita la clase
    document.body.classList.toggle("darkMode")

    if (JSON.parse (localStorage.getItem("modoOscuro")) == false){
        localStorage.setItem ("modoOscuro", true)
        }else {
            localStorage.setItem ("modoOscuro", false)
        }
    })