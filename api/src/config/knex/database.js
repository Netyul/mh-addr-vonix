const config = require('./database/midiadesk.js');
const database = require('knex')(config);
module.exports = {
    database
};
