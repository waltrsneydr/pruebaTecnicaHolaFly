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
        const {pleopleId = 1, planetId = 1} = req.query;

        let dataPeople = await factoryPeopleImp.peopleFactory(pleopleId,_isWookieeFormat(req));
        if( !dataPeople ){
            dataPeople =await app.swapiFunctions.genericResponseSwapiPeople(`https://swapi.dev/api/people/${pleopleId}`);
        }
        let dataPlanet = await factoryPlanetImp.planetFactory(planetId);
        if( !dataPlanet ){
            dataPlanet = await app.swapiFunctions.genericResponseSwapiPlanet(`https://swapi.dev/api/planets/${planetId}`);
        }

        console.log(dataPeople.homeworld_name,dataPlanet.name);

        if(dataPeople.homeworld_name === dataPlanet.name){
            return res.status(409).json({
                msg : "Estas intentando calcular el peso del personaje en su pais natal"
            })
        }
        const calculoPG = app.swapiFunctions.getWeightOnPlanet(dataPeople.mass, dataPlanet.gravity)
        console.log(calculoPG)
        if( calculoPG === 'gravity' ){
            return res.status(400).json({
                msg : `La gravedad del planeta ${dataPlanet.name} es ${dataPlanet.gravity} no es posible realizar el calculo`
            });
        }

        if( calculoPG === 'mass' ){
            return res.status(400).json({
                msg : `La masa del personaje ${dataPeople.name} es ${dataPeople.mass} no es posible realizar el calculo`
            });
        }
        return res.status(200).json({
            msg : `${calculoPG}`
        });
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;