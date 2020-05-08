// require dependencies
const fs = require("fs");
const path = require("path");
const nodeFetch = require("node-fetch");
const assert = require("assert");

// declare constants
const START = Date.now();
const REPORT_FILE =
  __dirname + "/" + path.basename(__filename).replace(".js", "-report.txt");

// define logging function
const log = (msg) => {
  const now = `${Date.now() - START} ms: `;
  console.log(now + msg);
  if (typeof msg === "string") {
    const cleanedString = msg
      // remove special characters used to print assertion colors in terminal
      .replace(/\[31m|\[32m|\[39m/g, "")
      // remove the file path from error messages for privacy and readability
      .replace(new RegExp(__dirname, "g"), " [ ... ] ");
    fs.appendFileSync(REPORT_FILE, now + cleanedString + "\n");
  } else {
    const stringifiedMsg = JSON.stringify(msg);
    fs.appendFileSync(REPORT_FILE, now + stringifiedMsg + "\n");
  }
};

// log when a user forces the script to exit
process.on("SIGINT", function onSIGINT() {
  log("Ctrl-C");
  process.exit(2);
});

// log uncaught errors
const handleError = (err) => {
  log(err);
  process.exit(1);
};
process.on("uncaughtException", handleError);
process.on("unhandledRejection", handleError);

// (re)initialize report file
fs.writeFileSync(REPORT_FILE, "");
log(new Date().toLocaleString());

// --- begin main script ---

// the type with 28 moves, 7 names, and 72 items
const DB_FILE = __dirname + "/../pokemon.json";
const OUTPUT_FILE = __dirname + "/../pokemon2.json";

function parsePokemons() {
  const pokemons = fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) throw err;
    for (el in JSON.parse(data)) {
      console.log("Name: " + el.name);
    }
    //data.map(console.log("Name: " + data.name));
  });
}

function eachPokemon(pokemon) {
  if (
    pokemon.moves.length === 28 &&
    pokemon.names.length === 7 &&
    pokemon.items.length === 72
  ) {
    console.log(pokemon.name);
    fs.appendFileSync(OUTPUT_FILE, "challenge-3: " + pokemon.name);
  }
}

parsePokemons();
