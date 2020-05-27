// import data from './data/injuries/injuries.js';
// import data from './data/lol/lol.js';
// import data from './data/patient/patient.js';
// import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';
// import data from './data/steam/steam.js';
// import data from './data/steam/worldbank.js';

// esta es una función de ejemplo

//filterData, filtra la data y nos retorna aquellos datos que cumplan la condición
const filterData = (key, value, data) => { //2 parámetros. Value del index tiene 2 palabras (valor.propiedad)
  let items = data.filter(element => element[key].indexOf(value) > -1);
  //Variable vacia donde se guardara c/elemento que cumpla con la condición. -1 = index inexistente = false
//Items: elemento que se está iterando (realizar cierta acción varias veces)
  return items;
};

const filterHumans = (data) => {
  let items = data.filter(element => element.species === 'Human');
  return items;
};

const statisticsPercentage = (key, value, data) => {
  let total = data.length;
  let items = data.filter(element => element[key].indexOf(value) > -1);
  let result = (items.length * 100) / total;
  return Math.round(result);
};

const statisticsValue = (key, value, data) => {
  let items = data.filter(element => element[key].indexOf(value) > -1);
  return items.length;
  //la propiedad de longitud establece o devuelve el número de elementos de un conjunto.
};



//sortData esta función : sort  ordena recibe tres parámetros. El primer parámetro, data, nos entrega los datos.
//sortOrder indica si se quiere ordenar de manera ascendente o descendente.
const sortData = (data, sortOrder) =>{
  console.log(data);
  // console.log(sortBy);
  console.log(sortOrder);
  return data.sort((a, b) => {
    let nameA = a.name.toUpperCase(); //El método toUpperCase() no cambia la cadena original.
    let nameB = b.name.toUpperCase();
    if (sortOrder === 'a-z'){
      if (nameA < nameB){
        return -1;
    }else if(nameA > nameB){
        return 1;
    }else {
        return 0;
    }
  }else{
    if (nameA > nameB){
        return -1;
    }else if(nameA < nameB){
        return 1;
    }else {
        return 0;
    }
}
});

};


window.sortData = sortData;
window.filterData = filterData; //Guarda la función en el global para poder ser invocada de donde sea
window.statisticsPercentage = statisticsPercentage;
window.statisticsValue = statisticsValue;
window.filterHumans = filterHumans;
