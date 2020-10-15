class PokemonsController < ApplicationController

  def index
    render json: Pokemon.all.to_json(except: [:created_at, :updated_at])
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    
    render json: pokemon.to_json
  end

  def destroy
    trainer = Trainer.find(Pokemon.find(params[:id]).trainer_id)
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: trainer.to_json
  end

end
