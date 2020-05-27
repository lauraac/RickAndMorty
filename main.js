

//CONST
const catalogoButton = document.getElementById('catalogo'); // catalog button
const logo = document.getElementById('logo'); // logo element
const data = window.RICKANDMORTY.results; // Call data R&M
let newData = '';
const filterButton = document.getElementById('filter'); //Filter options button
const speciesButton = document.getElementById('species'); // Species options button
const orderButton = document.getElementById('order'); //Order options button 
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');
const curiosity = document.getElementById('curiosity');
const counter = document.getElementById('counter');
//HIDE & SHOW

const hideSection = id => document.getElementById(id).classList.add('hide');
const showSection = id => document.getElementById(id).classList.remove('hide');

const showCatalogo = () => {
    hideSection('landing-page');
    showSection('characters-page');
};

const returnToIndex = () => {
    hideSection('characters-page');
    showSection('landing-page');
};

catalogoButton.addEventListener('click', showCatalogo);
logo.addEventListener('click', returnToIndex);

//Carousel
const percentage = window.statisticsPercentage;
const value = window.statisticsValue;

const curiosities = [
    ` Dos personajes, una sola voz.
    Justin Roiland uno de los creadores de la serie se encarga de hacer las voces de ambos personajes principales en inglés, a veces lo hace al mismo tiempo grabando diálogos consigo mismo.`,
    ` La serie está inspirada en los personajes de la películas "Volver al Futuro" `,
    ` No hay reglas
    Rick y Morty viajan todo el tiempo a diferentes lugares, no importa si quedan lejos o cerca, en otras coordenadas temporales y tampoco si deben aparecer criaturas extrañas.
     `,
    ` Los eructos son reales
    Cuando Roiland graba las partes de Rick siempre tiene cerveza y comida.`,
    `Rick y Morty representan las dos partes del cerebro
    Morty es la inocencia, la niñez y la curiosidad, mientras que Rick es lo tosco, egoísta y despreocupado. `,
    
   
];

let changer = 0;
curiosity.innerHTML = curiosities[changer];

const next = () => {
    changer++;
    carousel();
};

const back = () => {
    changer--;
    carousel();
};

const carousel = () => {
    if (changer > curiosities.length - 1) {
        changer = 0;
    } else if (changer < 0) {
        changer = curiosities.length - 1;
    }
    curiosity.innerHTML = curiosities[changer];
};


nextButton.addEventListener('click', next);
backButton.addEventListener('click', back);


// Showing data
const allData = document.getElementById('all-data'); //Section where data is going to appear
const templateStringForCards = (element) => {
    return `<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <div class="img">
                <img class="character-img" src="${element.image}" alt="${element.name}"/>
            </div>
            <div class="info">
                <p class="character-name">${element.name}</p>
                <p>Especie: ${element.species}</p>
                <p class="dimension"> Dimensión origen: </p>
                <p>${element.origin.name}</p>
            </div>
            <div class="icon">
                <img src="img/rmicon.svg" alt="">
            </div>
        </div>
        <div class="flip-card-back">
            <div class="info">
                <p class="character-name"> ${element.name} </p>
                <p class="dimension"> Dimensión actual: <p> 
                <p>${element.location.name}</p>
                <p> Tipo: ${element.type} </p>
                <p> Género:  ${element.gender} </p>
                <p> Estatus: ${element.status} </p>
            </div>
            <div class="icon">
                <img src="img/rmiconB.svg" alt="">
            </div>
        </div>
    </div>
</div>`;
};

//FUNCTION to show data
const showData = () => {
    let items = ''; //Variable vacía donde se imprimira cada elemento del data
    data.forEach(element => {
        items +=
            templateStringForCards(element);
    });
    let counterValue = data.length;
    counter.innerHTML = counterValue;
    allData.innerHTML = items;
};

showData();
//La función split() permite dividir una cadena de caracteres (string) en varios bloques y crear un array con estos, en función de un elemento indicador del split.
//Trabajando con el botón de filtro
const getFilterValue = event => {
    const filterValue = event.target.value; //Se guarda el valor de los option del html
    if (filterValue === 'all') {
        newData = data;
        showData();
    } else {
        //Funciones para que me salga el filtro ej. "mujer"
        const splitFilterValue = filterValue.split('.'); //Toma el filter value y lo divide en un array por el punto. El split detecta el . del nombre del value.
        const key = splitFilterValue[0]; //aqui se guarda la propiedad ej. "name"
        const value = splitFilterValue[1]; //aqui se guarda el valor ej."Rick"

        let result = window.filterData(key, value, data); //variable vacía que guarda el resultado de la función ya ejecutada
        newData = result;
        let counterValue = newData.length;
        counter.innerHTML = counterValue;
        const cards = result.map(element => templateStringForCards(element)); // result = array. .map itera items
        allData.innerHTML = cards.join(''); //Al cumplirse con la condición, ejecutar el siguiente código.   
    }
    //imprime el resultado dentro de la sección allData. .join concatena los elementos de un array.
    //.map | crea una nueva matriz con el resultado de ejecutar la función proporcionada a cada elemento de la matriz
};

const getOrdervalue = event => {
    const orderValue = event.target.value;
    const sort = newData !== '' ? newData : data;
    const result = window.sortData(sort, orderValue);
    const card = result.map(element => templateStringForCards(element));// result = array. .map itera items
    allData.innerHTML = card.join('');//Al cumplirse con la condición, ejecutar el siguiente código.   
};

const getSpeciesValue = event => {
    const speciesValue = event.target.value; //Se guarda el valor de los option del html
    const dataType = newData !== '' ? newData : data;

    if (speciesValue === 'species.Human') {
        let result = window.filterHumans(dataType);
        let counterValue = result.length;
        counter.innerHTML = counterValue;
        const card = result.map(element => templateStringForCards(element)); // result = array. .map itera items
        allData.innerHTML = card.join('');
    } else {
        const splitSpeciesValue = speciesValue.split('.'); //Toma el filter value y lo divide en un array por el punto. El split detecta el . del nombre del value.
        const key = splitSpeciesValue[0]; //aqui se guarda la propiedad ej. "name"
        const value = splitSpeciesValue[1]; //aqui se guarda el valor ej."Rick"

        let result = window.filterData(key, value, dataType); //variable vacía que guarda el resultado de la función ya ejecutada
        let counterValue = result.length;
        counter.innerHTML = counterValue;
        const card = result.map(element => templateStringForCards(element)); // result = array. .map itera items
        allData.innerHTML = card.join(''); //Al cumplirse con la condición, ejecutar el siguiente código.
    };
}

filterButton.addEventListener('change', getFilterValue);
orderButton.addEventListener('change', getOrdervalue);
speciesButton.addEventListener('change', getSpeciesValue);