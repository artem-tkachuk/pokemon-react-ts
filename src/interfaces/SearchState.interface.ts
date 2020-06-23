import {PokemonInterface} from "./Pokemon.interface";

export default interface SearchStateInterface {
    error: boolean
    pokemon: PokemonInterface
}