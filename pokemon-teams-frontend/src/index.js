const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", ()  => {
  // fetchPokemon()
  fetchTrainers()
});

function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(rsp => rsp.json())
  .then((trainerArray) => {
    trainerArray.forEach((trainer) => {
      renderCard(trainer)
    })
  });
}

const renderCard = (trainer) => {
  let main = document.querySelector("main")

  let div = document.createElement("div")
  let pTag = document.createElement("p")
  div.classList.add("card") // name of Trainer
  pTag.innerText = trainer.name
  
  let pokemonUl = document.createElement("ul")
  let addButton = document.createElement("button")
  addButton.innerText = "Add Pokemon"
  addButton.addEventListener("click", () => {
    // console.log(trainer)
    addPokemon(trainer, pokemonUl)
  });
  /* if the fuction is an invocation, the action will happen immediately instead of waiting for the event. We only want that action when the click event goes off. The only way to do that is to have the function argument in the addEventListener, be a callback, or in the () =>  
  The () makes it a invocation. */ 

  main.append(div)

  div.append(pTag, addButton, pokemonUl)
  
  trainer.pokemons.forEach((trainerPokemon) => {
    renderPokemon(trainerPokemon, pokemonUl, trainer)
  });
}

function renderPokemon(trainerPokemon, pokemonUl, trainer){
    let pokemonList = document.createElement("li")
    let releaseButton = document.createElement("button");
    releaseButton.classList.add("release")
    releaseButton.addEventListener("click", () => {
      releasePokemon(pokemonList, trainerPokemon, trainer)
    })

    pokemonList.innerText = `${trainerPokemon.nickname} ( ${trainerPokemon.species} )`

    releaseButton.innerText = "Release"
    pokemonUl.append(pokemonList)
    pokemonList.append(releaseButton)

    return trainerPokemon
}


function addPokemon(trainer, pokemonUl){
  if (trainer.pokemons.length < 6){

    let requestPackage = {}; 
    requestPackage.method = 'POST'; 
    requestPackage.headers = { 'Content-Type': 'application/json' };
    requestPackage.body = JSON.stringify({trainer_id: trainer.id});

    fetch(POKEMONS_URL, requestPackage)
    .then(rsp => rsp.json())
    .then(poke => renderPokemon(poke, pokemonUl, trainer))
    .then(pokeData => updateTrainerPokemon(trainer, pokeData));
    
  }
}

function updateTrainerPokemon(trainer, poke){
  trainer.pokemons.push(poke)
}

function releasePokemon(pokemonList, trainerPokemon, trainer){
  // remove_array_element(trainer.pokekmons, trainerPokemon)
  // for (let x = 0; x < trainer.pokemons.length; x++){
  // if (trainer.pokemons[x] == trainerPokemon){
  // }
  // }
  console.log(trainerPokemon);

  let deletePackage = {}; 
    deletePackage.method = 'DELETE'; 
    deletePackage.headers = { 'Content-Type': 'application/json' };

  fetch(POKEMONS_URL+`${trainerPokemon.id}`, deletePackage)
  .then(rsp => rsp.json())
  .then(data => {
    trainerPokemon.remove()
    trainer = data
  })
  .catch(rsp => {console.log("This did not work")});
  
}

// When you are accessing the database, you need to update the frontend and backend. What info do I need to do both things? 

function remove_array_element(array, n) {   
  var index = array.indexOf(n); 
  if (index > -1) { 
    array.splice(index, 1);
  } 
  return array; }

