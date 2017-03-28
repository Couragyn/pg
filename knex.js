const settings = require("./settings"); // settings.json
const moment = require("moment"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: settings
});

var name = process.argv.slice(2);
name = name.toString();


var test = knex.select().from('famous_people').timeout(1000)
  .where('last_name', '=', name)
  .orWhere('first_name', '=', name)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    if (rows.length > 0) {
      result(rows);
    } else {
      console.log(`No persons found by the name '${name}'`);
    }
});
knex.destroy();

function result(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${name}':`)
  rows.forEach(function(person, index) {
    console.log(`-${index + 1}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format('YYYY-MM-DD')}'`);
  })
}