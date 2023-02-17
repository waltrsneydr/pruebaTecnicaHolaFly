const dbModels = require('../db')

class CommonPlanet {
    constructor(id){
        this.id =  id ;
    }

    async init() {
        const data = await dbModels.swPlanet.findOne({
            attributes : ['name', 'gravity'],
            where : { id : this.id}
        });
        return data;
    }
}

module.exports = CommonPlanet;