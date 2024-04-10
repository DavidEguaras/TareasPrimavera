const cityList = document.getElementById("cityList");
const cities = cityList.getElementsByTagName("li");
const originalCities = cities;
const populationList = document.getElementById("populationList");
const population = populationList.getElementsByTagName("li");
const originalPopulation = population;

let citiesArray = [];
let populationArray = [];

for (let i = 0; i < cities.length; i++) {
    citiesArray.push(cities[i].textContent);
    populationArray.push(parseFloat(population[i].textContent));
}

function sortAlphabetically() {
    citiesArray.sort();

    for (let i = 0; i < citiesArray.length; i++) {
        cities[i].textContent = citiesArray[i];
    }
}

function sortByPopulation() {

    populationArray.sort((a, b) => a - b);

    for (let i = 0; i < populationArray.length; i++) {
        population[i].textContent = populationArray[i];
    }
}

function Unsort() {
    for (let i = 0; i < cities.length; i++) {
        cities[i].textContent = originalCities[i].textContent;
        population[i].textContent = originalPopulation[i].textContent;
    }
}
