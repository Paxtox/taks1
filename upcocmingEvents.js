const $sectionContenedorCard = document.getElementById("lista-section-card-2")
const events = data.events

let nombreEvents = crearCards(events)

function crearCards(lista, propiedad){
    let aux = [];
    for (let elemento of lista){
        aux.push(elemento[propiedad])
    }
    return aux
}



let yearOfEventDos = [];

for (let event of data.events){
    if (data.currentDate < event.date){
        yearOfEventDos.push(event)
    }
}

console.log(yearOfEventDos)
creaDivCards(yearOfEventDos)

function creaDivCards(lista){
    let htmlDos = "";
    
    for (let event of lista){
        htmlDos += `
        <div class="card col-8 col-sm-5 col-lg-3 col-xxl-2">
        <img class="align-self-center" src="${event.image}" class="card-img-top" alt="food">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text"> ${event.description}</p>
        </div>
        <div class="card-body d-flex justify-content-evenly align-items-center gap-2">
            <h6 class="priceH6">Price: $${event.price} </h6>
            <a href="./details.html" class="link">Info</a>
        </div>
        </div>
        `;
    $sectionContenedorCard.innerHTML = htmlDos
};
};
