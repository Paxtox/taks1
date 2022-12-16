const info = data.events

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
console.log(id)
const eventos = info.find(item => item._id == id)

console.log(eventos)
const container = document.getElementById("container")

container.innerHTML= `
                <div class="text-center">
                <img class="align-self-center" src="${eventos.image}" class="card-img-top" alt="food" id="image-details">
                <h2>${eventos.name}</h2>
                <h6>${eventos.description}</h6>
                </div>
                <ul>
                <li><span class="fw-semibold text-decoration-underline">Date:${eventos.date}</span></li>
                <li><span class="fw-semibold text-decoration-underline">Place:${eventos.place}</span></li>
                <li><span class="fw-semibold text-decoration-underline">Assistance:${eventos.assistance}</span></li>
                <li><span class="fw-semibold text-decoration-underline">Capacity:${eventos.capacity}</span></li>
                <li><span class="fw-semibold priceH6">Price: $${eventos.price}</span></li>
                </ul>
                `