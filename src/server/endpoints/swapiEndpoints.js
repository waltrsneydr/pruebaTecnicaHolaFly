const factoryPeopleImp = require('../../app/People');
const factoryPlanetImp = require('../../app/Planet');

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const { id } = req.params;
        const data = await factoryPeopleImp.peopleFactory(id,_isWookieeFormat(req));
        if( !data ){
            return res.send(await app.swapiFunctions.genericResponseSwapiPeople(`https://swapi.dev/api/people/${id}`));
        }
        return res.send(data);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const { id } = req.params;
        const data = await factoryPlanetImp.planetFactory(id);
        if( !data ){
            return res.send(await app.swapiFunctions.genericResponseSwapiPlanet(`https://swapi.dev/api/planets/${id}`));
        }
        return res.send(data);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;