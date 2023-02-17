const AbstractPeople = require('./abstractPeople');
const dbModels = require('../db')

class CommonPeople extends AbstractPeople {
    constructor(id){
        super(id);
       // throw new Error("To be implemented");
    }

    async init() {
        const data = await dbModels.swPeople.findOne({
            attributes : ['name', 'mass','height','homeworld_name','homeworld_id'],
            where : { id : this.id}
        });
        return data;
    }
}

module.exports = CommonPeople;