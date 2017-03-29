const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: settings
});

let args = process.argv.slice(2);
let fname = args[0];
let lname = args[1];
let bdate = args[2];
console.log(fname, lname, bdate);

knex('famous_people').insert({first_name: fname, last_name: lname, birthdate: bdate})
  .catch(function(err) {
    console.log(err);
})

knex.destroy();