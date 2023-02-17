const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
    if(mass === 'unknown'){
        return 'mass'
    }
    if(gravity === 'unknown'){
        return 'gravity'
    }
    if( isNaN(gravity) ){
        gravity = gravity.replace(/[^\d\.]/g, "")
    }
    mass = parseInt(mass)
    return mass * gravity;
}

const genericRequest = async (url, method, body, logging = false) => {
    let options = {
        method: method
    }
    if(body){
        options.body = body;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if(logging){
        console.log(data);
    }
    return data;
}

const genericResponseSwapiPeople = async (url) => {

    const responsePeople = await fetch(url);
    const dataPeople = await responsePeople.json();
    let idPlanet = dataPeople.homeworld.replace('https://swapi.dev/api','');
    const responsePlanet = await fetch(`https://swapi.dev/api${idPlanet}`);
    const dataPlanet = await responsePlanet.json();
    const jsonResponse = {
        name: dataPeople.name,
        mass: dataPeople.mass,
        height: dataPeople.height,
        homeworld_name: dataPlanet.name,
        homeworld_id: idPlanet
    };
    return jsonResponse;
}

const genericResponseSwapiPlanet = async (url) => {

    const response = await fetch(url);
    const data = await response.json();
    const jsonResponse = {
        name: data.name,
        gravity: data.gravity
        
    };
    return jsonResponse;
}

module.exports = {
    getWeightOnPlanet,
    genericRequest,
    genericResponseSwapiPeople,
    genericResponseSwapiPlanet
}