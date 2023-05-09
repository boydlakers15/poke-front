import { useState, useEffect } from 'react';
import styles from '../styles/PokemonList.module.css';
import "../styles/App.css";
import ReactPaginate from 'react-js-pagination';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FcHome, FcList } from 'react-icons/fc';
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 28;

  useEffect(() => {
    fetch('https://pokemon-backend.herokuapp.com/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data))
      .catch(error => console.log(error))
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
      <nav>
      <ul>
      <li>
            <Link to="/home"> <FcHome /> Home</Link>
        </li>
        <li>
          <Link to="/fight" style={{ display: "flex", alignItems: "center" }}>
            <img src='https://cdn-icons-png.flaticon.com/512/1408/1408998.png' style={{ height: "20px", width: "20px", paddingRight: "5px" }}/>
            <span>Fight</span>
          </Link>
        </li>
      </ul>
      </nav>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      <div className="game-box">
        </div> 
      <h1>Pokemon List</h1>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={handleSearch} />
      </div>
      <ul>
        {currentItems.map(pokemon => (
          <li key={pokemon.id}>
            <a href={`https://pokemon-backend.herokuapp.com/pokemon/${pokemon.id}`} className={styles.link}>
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
