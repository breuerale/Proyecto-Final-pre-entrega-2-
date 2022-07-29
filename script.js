//Agregar uso de JSON, Storage, DoM y Eventos del usuario.(todo lo que se vio hasta el momento)


class Club {
    constructor(id, nombre, creacion, liga, titulos, goleador) {
        this.id = id
        this.nombre = nombre.toUpperCase()
        this.creacion = parseInt(creacion)
        this.liga = liga.toUpperCase()
        this.titulos = titulos
        this.goleador = goleador.toUpperCase()
    }
}


let id = 0, nombre, creacion, liga, titulos, goleador, continuar, respuesta

let clubes = []

//Consulto mi localStorage si existe o no existe:
if(localStorage.getItem("clubes")) {
    clubes = JSON.parse(localStorage.getItem("clubes"))
} else {
    localStorage.setItem("clubes", JSON.stringify(clubes))
}


const form = document.getElementById("idForm")
const divClubes = document.getElementById("divClubes")
const botonClubes = document.getElementById("botonClubes")



form.addEventListener("submit", (event) => {
    event.preventDefault()
    nombre = document.getElementById("idNombreClub").value
    creacion = parseInt(document.getElementById("idCreacion").value)
    liga = document.getElementById("idLiga").value
    titulos = parseInt(document.getElementById("idTitulos").value)
    goleador = document.getElementById("idGoleador").value
    const club = new Club(id, nombre, creacion, liga, titulos, goleador)
    clubes.push(club)
    //Guardo en mi localStorage cada tarea que agrega mi usuario:
    localStorage.setItem("clubes",JSON.stringify(clubes))
    form.reset()
})


botonClubes.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem('clubes'))
    divClubes.innerHTML ="" 

    arrayStorage.forEach((club, indice) => {
        divClubes.innerHTML += `
        <div class="card" id="club${indice}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Club: ${club.nombre}</h5>
                <p class="card-text">Fundacion: ${club.creacion}</p>
                <p class="card-text">Liga: ${club.liga}</p>
                <p class="card-text">Titulos Totales: ${club.titulos}</p>
                <p class="card-text">Goleador: ${club.goleador}</p>
                <button class="btn btn-danger">Eliminar Club</button>
            </div>
        </div>`
    })
//Borro el club
    arrayStorage.forEach((club,indice) => {
        let botonCard = document.getElementById(`club${indice}`).lastElementChild.lastElementChild
        console.log(botonCard)
        botonCard.addEventListener("click", () => {
            document.getElementById(`club${indice}`).remove()
            clubes.splice(indice,1)
            localStorage.setItem("clubes",JSON.stringify(clubes))
            console.log(`${club.nombre} Eliminada`)
        })
        
    })
})

//Buscar por club

const divRespuesta1 = document.getElementById("respuesta1")
const botonBuscarClub = document.getElementById("botonBuscarClub")

function buscarClub(busqueda) {
    let clubBuscado = clubes.find(club => club.nombre == busqueda)
    divRespuesta1.innerHTML = ""
    if (clubBuscado) {
        divRespuesta1.innerHTML += `
        <div>
        <p> El Club Buscado ${clubBuscado.nombre} </p>
        </div>`
    } else {
        divRespuesta1.innerHTML += `
        <div>
        <p> Club Inexistente en la base de Datos </p>
        </div>`
    }
}

botonBuscarClub.addEventListener("click", () => {
    const inputBuscarClub = document.getElementById("idBuscarClub").value.toUpperCase()
    buscarClub(inputBuscarClub)
})

//Buscar por antiguedad

const botonAnioClub = document.getElementById("botonAñoClub")

function buscarAntiguedad(busqueda) {
    let clubesBuscados = clubes.filter(club => club.creacion === busqueda)
    console.log(clubesBuscados)
    divRespuesta1.innerHTML = ""
    if (clubesBuscados.length == 0) {
        divRespuesta1.innerHTML += `
        <div>
        <p>No existen clubes con dichas caracteristicas   </p>
        </div>
        `
    } else {
        for (let x = 0; x < clubesBuscados.length; x++) {
            divRespuesta1.innerHTML += `
            <div>
            <p> ${clubesBuscados[x].nombre} se creó en ${busqueda}  </p>
            </div>`
        }

    }
}

botonAnioClub.addEventListener("click", () => {
    const inputAnioClub = parseInt(document.getElementById("añoClub").value)
    buscarAntiguedad(inputAnioClub)
})


function buscarGoleador(busqueda) {
    let clubBuscado = clubes.find(clubes => clubes.goleador == busqueda)
    divRespuesta1.innerHTML = ""
    if (clubBuscado == undefined) {
        divRespuesta1.innerHTML += `
        <div>
        <p>Goleador inexistente en la base de datos</p>
        </div>
        `
    } else {
        divRespuesta1.innerHTML += `
        <div>
        <p> ${inputMaxGoleador.value} juega en ${clubBuscado.nombre} </p>
        </div>`
    }
}
/*
Se puede hacer de esta forma o
function sumarTitulos(clubes) {
    let acumulador = 0
    let titulos = clubes.map(clubes => clubes.titulos)
    divRespuesta1.innerHTML = ""
    titulos.forEach(titulo => acumulador += titulo)

    divRespuesta1.innerHTML += `
    <div>
    <p> Titulos totales: ${acumulador} </p>
    </div>`
}
*/

function sumarTitulos(clubes){
    let total = clubes.reduce((acumulador,elemento)=> acumulador+elemento.titulos ,0);
    divRespuesta1.innerHTML = "";
    divRespuesta1.innerHTML += `
    <div>
    <p> Titulos totales: ${total} </p>
    </div>`
}


//Tercer Funcion:

const botonMaxGoleador = document.getElementById("botonMaxGoleador")

botonMaxGoleador.addEventListener("click", () => {
    const inputMaxGoleador = document.getElementById("inputMaxGoleador").value.toUpperCase()
    buscarGoleador(inputMaxGoleador)
})

//Cuarta Funcion:
const botonSumar = document.getElementById("botonSumar")

botonSumar.addEventListener("click", () => {
    sumarTitulos(clubes)
})







