import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonList from './comp/PokemonList';
import PokemonDetails from './comp/PokemonDetails';
import PokemonInfo from './comp/PokemonInfo';
import Fight from './comp/Fight';
import Home from './comp/Home';
import Leaderboard from './comp/leaderboard';
import SavedGames from './comp/SavedGames';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pokemonList">Pokemon List</Link>
          </li>
          <li>
            <Link to="/fight">Fight</Link>
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
