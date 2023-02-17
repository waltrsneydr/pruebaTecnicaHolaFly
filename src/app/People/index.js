const wookieePeople = require('./wookieePeople');
const commonPeople = require('./commonPeople');

const peopleFactory = async (id, lang) => {
    let people = null;
    if (lang){
        people = new wookieePeople(id);
    } else {
        people = new commonPeople(id);
    }
    people = await people.init();

    return people;
}

module.exports = { peopleFactory }