const fs = require("fs");
const nodeFetch = require("node-fetch");

const REPORT_FILE = __dirname + "/pokemon.json";
const OUTPUT_FILE = __dirname + "/pokemon2.json";

function fetchKantoPokemon() {
  nodeFetch("https://pokeapi.co/api/v2/item?limit=151")
    //fetch("https://pokeapi.co/api/v2/pokemon/?offset=80&limit=100")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach((pokemon) => {
        fetchPokemonData(pokemon);
      });
    });
}

//necessary data
/*const params = [
  data.name,
  data.names,
  data.abilities,
  data.cost,
  data.fling_power,
  data.fling_effect,
  data.baby_trigger_for,
  data.accuracy,
  data.pp,
  data.priority,
  data.power,
  data.height,
  data.weight,
  data.base_experience,
  data.damage_relations,
  data.pokemon,
  data.moves,
  data.evolution_chain.url,
];*/

// the type with 28 moves, 7 names, and 72 items
//the pokemon who's previous evolution is "Meowth"

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  nodeFetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.map(parsePokemon);
      fs.appendFileSync(REPORT_FILE, JSON.stringify(data, null, 2));
      //fs.appendFile(REPORT_FILE, data, function (err) {
      //  if (err) {
      //    console.log(err);
      //  }
      //});
      //console.log(data);
    });
  /* .then((pokeData) => {
        if (
          pokeData.cost === 3000 &&
          pokeData.fling_power === 30 &&
          pokeData.fling_effect === null &&
          pokeData.baby_trigger_for === null
        ) {
          console.log("cost=3000 ");
          console.log(pokeData);
        }
      });*/
}

fetchKantoPokemon();

//const pokemons = JSON.parse(fs.readFileSync(REPORT_FILE, "utf8"));
//console.log("#1: " + pokemons[0]);

function parsePokemon(data) {
  //const pokemons = JSON.parse(fs.readFileSync(REPORT_FILE, "utf8"));
  let x = {
    name: data.name,
    names: data.names,
    abilities: data.abilities,
    cost: data.cost,
    fling_power: data.fling_power,
    fling_effect: data.fling_effect,
    baby_trigger_for: data.baby_trigger_for,
    accuracy: data.accuracy,
    pp: data.pp,
    priority: data.priority,
    power: data.power,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    damage_relations: data.damage_relations,
    pokemon: data.pokemon,
    moves: data.moves,
    evolution_chain: data.evolution_chain,
  };
  return x;
}
