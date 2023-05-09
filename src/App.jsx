import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonList from './comp/PokemonList';
import PokemonDetails from './comp/PokemonDetails';
import PokemonInfo from './comp/PokemonInfo';
import Fight from './comp/Fight';
import Home from './comp/Home';
import LogoutPage from './comp/LogoutPage';
import Leaderboard from './comp/leaderboard';
import SavedGames from './comp/SavedGames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = (data) => {
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleLogin = async () => {
    try {
      const response = await axios.get(
        ` https://pokemon-backend.herokuapp.com/users`
      );
      console.log(response.data[0]);
      console.log(formState);
      // Find the user with the entered username and password
      const user = response.data.find(({ username: usernameInput, password: passwordInput}) => {
        return usernameInput === formState.username && passwordInput === formState.password;
      });
      
      console.log(data);
      if (user) {
        // Set the isLoggedIn state to true and navigate to the home page
        data.setIsLoggedIn(true);
        navigate('/home');
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        " https://pokemon-backend.herokuapp.com/signup",
        JSON.stringify({
          username: formState.username,
          password: formState.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set the isLoggedIn state to true
      data.setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("Failed to create user");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };
  

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      
        <div>
          <label>
            Username:
            <input type="text" name="username" value={formState.username} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={formState.password} onChange={handleInputChange} />
          </label>
        </div>
        <button title="Login" onClick={handleSubmit}>Login</button>
        <button title="Signup" onClick={handleSignup}>Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      <br />
      <div className="game-box">
          
          <p style={{ color: "black" }}>(Pokémon Gotta catch 'em all) It's you and me I know it's my destiny (Pokémon) Oh, you're my best friend In a world we must defend (Pokémon Gotta catch 'em all) A heart so true Our courage will pull us through You teach me and I'll teach you (Ooh, ooh) Pokémon! (Gotta catch 'em all) Gotta catch 'em all Yeah</p>
        </div>
    </div>
  );
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Router>
    <Routes>
      <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/pokemonList" element={<PokemonList />} />
          <Route path="/fight" element={<Fight />} />
          <Route path="/game/leaderboard" element={<Leaderboard />} />
          <Route path="/savedGames" element={<SavedGames />} />
          <Route path="/logout" element={<LogoutPage />} />
        </>
      ) : (
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      )}
    </Routes>
  </Router>
  );
}

export default App;
