import { useState, useEffect } from 'react';
import styles from './PokemonList.module.css';
import "../App.css";
import ReactPaginate from 'react-js-pagination';
import axios from 'axios';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    const getPokemonList = async () => {
      const response = await axios.get('https://pokemon-fightgrp3.herokuapp.com/pokemon');
      setPokemonList(response.data);
    };
    getPokemonList();
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())).slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setActivePage(1);
  }

  return (
    <div className="centered-container">
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      <center>
        <div className="pokemon-image img" mr={1}>
          <img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="150" height="150" />
        </div>
      </center> 
      <h1>Pokemon List</h1>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={handleSearch} />
      </div>
      <ul>
        {currentItems.map(pokemon => (
          <li key={pokemon.id}>
            <a href={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex/${pokemon.id}.json`} className={styles.link}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name.english} className={styles.image} />
              <div className={styles.name}>{pokemon.name.english}</div>
            </a>
          </li>
        ))}
      </ul>
      <ReactPaginate
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())).length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        prevPageText="Previous"
        nextPageText="Next"
        firstPageText="First"
        lastPageText="Last"
      />
    </div>
  );
}

export default PokemonList;
