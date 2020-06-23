import React, {Component} from 'react';
import './App.css';
import PokemonSearch from "./components/PokemonSearch";

class App extends Component {
  render() {
    return (
        <div className="App">
          <PokemonSearch name={"John Doe"} numberOfPokemons={5}/>
        </div>
    );
  }
}

export default App;