import pokemonApi from "../api/pokemonApi";
import { Pokemon } from "../interfaces";
 
 export const getPokemonInfo = async ( nameOrId: string) => {

    const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${nameOrId}`);
  
    return {
      id: data.id, 
      name: data.name,
      sprites: data.sprites
  
    }

}


