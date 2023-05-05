import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonList from './comp/PokemonList';
import PokemonDetails from './comp/PokemonDetails';
import PokemonInfo from './comp/PokemonInfo';
import Fight from './comp/Fight';
import Home from './comp/Home';
import Leaderboard from './comp/leaderboard';
import SavedGames from './comp/SavedGames';
import { FcHome, FcList } from 'react-icons/fc';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/"> <FcHome /> Home</Link>
          </li>
          <li>
          <Link to="/fight" style={{ display: "flex", alignItems: "center" }}>
              <img src='https://cdn-icons-png.flaticon.com/512/188/188987.png' style={{ height: "20px", width: "20px", paddingRight: "5px" }}/>
              <span>Pokemon List</span>
            </Link>
          </li>
          <li>
            <Link to="/fight" style={{ display: "flex", alignItems: "center" }}>
              <img src='https://cdn-icons-png.flaticon.com/512/1408/1408998.png' style={{ height: "20px", width: "20px", paddingRight: "5px" }}/>
              <span>Fight</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/pokemonList" element={<PokemonList />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/game/leaderboard" element={<Leaderboard />} />
        <Route path="/savedGames" element={<SavedGames />} />
      </Routes>
    </Router>
  );
}

export default App;
