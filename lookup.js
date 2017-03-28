const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require("moment"); // settings.json


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query("SELECT * from famous_people WHERE first_name = $1::text OR last_name = $1", name, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    if (result.rows.length > 0) {
      console.log(`Found ${result.rows.length} person(s) by the name '${name}':`)
      result.rows.forEach(function(person, index) {
        console.log(`-${index + 1}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format('YYYY-MM-DD')}'`);
      })
    } else {
      console.log(`No persons found by the name '${name}'`);
    }
    client.end();
  });
});
