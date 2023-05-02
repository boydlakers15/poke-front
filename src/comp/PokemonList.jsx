import { useState, useEffect } from 'react';
import styles from './PokemonList.module.css';
import "../App.css";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data))
      .catch(error => console.log(error))
  }, []);

  

  return (
    <div className="centered-container">
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
       <center><div className="pokemon-image img" mr={1}>
          <img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="150" height="150" />
        </div></center> 
      <h1>Pokemon List</h1>
      <ul>
        {PokemonList.map(pokemon => (
          <li key={pokemon.id}>
            <a href={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json/${pokemon.id}`} className={styles.link}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name.english} className={styles.image} />
              <div className={styles.name}>{pokemon.name.english}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
