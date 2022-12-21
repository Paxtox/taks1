let tablaUno = document.getElementById("tabla1")
let tablaFutura = document.getElementById("tabla-futura")
let tablaPasada = document.getElementById("tabla-pasada")

let dataGeneral;

fetch(`https://amazing-events.onrender.com/api/events`)
        .then(repuesta => repuesta.json())
        .then(eventos => {
            dataGeneral = eventos
            let events = eventos.events
            let masAlto = porcentajeMasAlto(events) 
            let masBajo = porcentajeMasBajo(events)
            let mayorCapacidad = eventosMayorCapacidad(events)
            rendertable(masAlto[0].name, masBajo[0].name, mayorCapacidad[0].name, tablaUno)
            console.log(eventosFuturos(events, tablaFutura))
            eventosPasados(events, tablaPasada)
        })

function rendertable(dato1,dato2,dato3,contenedor){
            let html = `
            <tr>
            <td>${dato1}</td>
            <td>${dato2}</td>
            <td>${dato3}</td>
            </tr>
            `
            contenedor.innerHTML += html
}

function porcentajeMasAlto(datos){
            let eventosConAsistencia = datos.filter(element =>element.assistance)
        let porcentajeEventos = eventosConAsistencia.map(element =>{
            let aux ={
                name: element.name,
                percentage : element.assistance / element.capacity * 100
            }
            return aux
            })
        let porcentajeEventosOrdenado = porcentajeEventos.sort((a,b) => a.percentage - b.percentage)
            return porcentajeEventosOrdenado.slice(-1)
            
}    

function porcentajeMasBajo(datos){
        let eventosConAsistencia = datos.filter(element=> element.assistance)
        let porcentajeEventos = eventosConAsistencia.map(element=>{
        let aux = {
            name: element.name, 
            percentage: element.assistance / element.capacity * 100
        }
        return aux
    })
        let porcentajeEventosOrdenado = porcentajeEventos.sort((a,b)=>a.percentage - b.percentage)
        return porcentajeEventosOrdenado.slice(0,1)
}

function eventosMayorCapacidad(datos){
        let eventosCapacidad = datos.map(element=>{
            let aux = {
                name : element.name,
                capacity: element.capacity
            }
            return aux
        })
        let capacidadEventosOrdendos = eventosCapacidad.sort((a,b)=> a.capacity - b.capacity)
        return capacidadEventosOrdendos.slice(-1)
}   

function eventosFuturos(eventos,contenedor){
                contenedor.innerHTML= "";
                let listaEvento = "";
                const eventosFiltrados = eventos.filter(events => events.date > dataGeneral.currentDate)
                console.log(eventosFiltrados)
                eventosFiltrados.forEach((element) => {
                    listaEvento += `
                    <tr>
                        <td>${element.category}</td>
                        <td>${(element.price * element.estimate).toLocaleString()}</td>
                        <td>${((element.estimate * 100) / element.capacity).toFixed(2)} %</td>
                    </tr>
                    `
                });
                contenedor.innerHTML = listaEvento
}

function eventosPasados(eventos, contenedor){
                contenedor.innerHTML = "";
                let listaEvento = "";
                const eventosFiltrados = eventos.filter(events => events.date < dataGeneral.currentDate)
                console.log(eventosFiltrados)
                eventosFiltrados.forEach((element)=>{
                listaEvento += `
                <tr>
                    <td>${element.category}</td>
                    <td>${(element.price * element.assistance).toLocaleString()}</td>
                    <td>${((element.assistance * 100) / element.capacity).toFixed(2)} %</td>
                </tr>
                `
            });
            contenedor.innerHTML = listaEvento
}
