import React, {Component} from 'react';

// Interfaces
import UserInterface from "../interfaces/User.interface";
import SearchStateInterface from "../interfaces/SearchState.interface";


class PokemonSearch extends Component<UserInterface, SearchStateInterface> {

    pokemonRef: React.RefObject<HTMLInputElement>;

    constructor(props: UserInterface) {
        super(props);

        this.state = {
            error: false,
            pokemon: null
        };

        this.pokemonRef = React.createRef();
    }

    addNumbers = (a: number, b: number): number => {
        return a + b;
    };


    onSearchClick = async () => {
        const inputValue = this.pokemonRef.current.value;

        try {
            const pokemonDataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);

            const pokemonDataJSON = await pokemonDataResponse.json();

            this.setState({
                error: false,
                pokemon: {
                    name: pokemonDataJSON.name,
                    numberOfAbilities: pokemonDataJSON.abilities.length,
                    baseExperience: pokemonDataJSON.base_experience,
                    imageUrl: pokemonDataJSON.sprites.front_default
                }
            });

        } catch (err) {
            console.error(err);

            this.setState({
                error: true
            });
        }
    };

    render() {
        const { name: username, numberOfPokemons } = this.props;
        const { error, pokemon } = this.state;

        let resultMarkup;

        if (error) {
            resultMarkup = <p>Pokemon not found, please try again!</p>;
        } else if (this.state.pokemon) {
            resultMarkup =
                <div>
                    <img src={pokemon.imageUrl} alt={"Pokemon"} className={"pokemon-image"} />

                    <p> {pokemon.name} has {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base experience points </p>
                </div>
        }

        return (
            <div>
                <p>
                    User {username}{' '}{ numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
                </p>

                <input type={"text"} ref={this.pokemonRef} />

                <button onClick={this.onSearchClick} className={"my-button"}>
                    Search
                </button>

                {resultMarkup}
            </div>
        );
    }
}

export default PokemonSearch;