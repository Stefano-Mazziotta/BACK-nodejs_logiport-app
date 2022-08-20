const { randomUUID } = require("crypto");

function idGenerator(){
    let randomId = randomUUID(); 
    randomId = randomId.split("-")[0];

    return randomId;
}

module.exports = idGenerator;