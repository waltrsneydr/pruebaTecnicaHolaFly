const planetInst = require('./commonPlanet');

const planetFactory = async( id ) =>{
    planet = new  planetInst(id);
    planet = await planet.init();
    return planet;
}

module.exports = { planetFactory }