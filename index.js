let events = data.events;
let cardContainer = document.getElementById("cards");
let containerCheck = document.getElementById("checkbox");
let searchBar = document.getElementById('busqueda-js')

renderCards(events, cardContainer);

function renderCards(array, container) {
  container.innerHTML = "";
  let emptyContainer = '';
  array.forEach((element) => {
    emptyContainer += 
    `<div class="card col-8 col-sm-5 col-lg-3 col-xxl-2">
    <img class="align-self-center" src="${element.image}" class="card-img-top" alt="food">
    <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text"> ${element.description}</p>
    </div>
    <div class="card-body d-flex justify-content-evenly align-items-center gap-2">
        <h6 class="priceH6">Price: $${element.price} </h6>
        <a href="./details.html?id=${element._id}" class="link">Info</a>
    </div>
    </div>`;
  });
  container.innerHTML = emptyContainer
};


let arrayWithoutRepeatCategories = [... new Set( events.map( element =>  element.category  ) ) ] ;


renderCategoriesOnCheckBoxes(arrayWithoutRepeatCategories, containerCheck);

function renderCategoriesOnCheckBoxes ( categories, container) {
    categories.forEach((element) => {
      container.innerHTML += ` <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="${element}"value="${element}">
    <label class="form-check-label" for="inlineCheckbox1">${element}</label>
    </div>`;
    });
}


containerCheck.addEventListener("change", (e) => {

  let arrayCategoryCheckedFilter = filterTwoTypesOfSearchings (events)
  renderCards(arrayCategoryCheckedFilter, cardContainer);
});

searchBar.addEventListener("input", () => {
  let filterByTwo = filterTwoTypesOfSearchings (events)
  renderCards(filterByTwo, cardContainer);
  
})




function filter(event) {
let checked = [...document.querySelectorAll("input[type ='checkbox']:checked")].map((element) => element.value);

let newArrayWithFilter = checked.map(valor  => event.filter( object => {
return object.category === valor
}   )).flat() 
 if (!checked.length) {
  return events
}else {
  return newArrayWithFilter
}
}

function searchFilter(eventos, searchValue) {
  return eventos.filter (event => event.name.toLowerCase().includes (searchValue.toLowerCase() ) )
}

function filterTwoTypesOfSearchings (eventos){
  let arrayCategoryCheckedFilter = filter(eventos)
  let arraySearchFilter = searchFilter(arrayCategoryCheckedFilter, searchBar.value)
  return arraySearchFilter
}













