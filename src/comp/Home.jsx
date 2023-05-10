import '../styles/home.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LogoutPage from './LogoutPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Home({ username }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`https://pokemon-backend.herokuapp.com/users?username=${username}`);
        setUserInfo(response.data[0]); // assuming there's only one user with that username
      } catch (error) {
        console.log(error);
      }
    }
    
    getUserInfo();
  }, [username]);

  return (
    <nav className="nav">
      <ul>
        <LogoutPage />
        <li>
          <Link to="/pokemonList" style={{ display: "flex", alignItems: "center" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/188/188987.png" style={{ height: "20px", width: "20px", paddingRight: "5px" }} />
            <span>Pokemon List</span>
          </Link>
        </li>
        <li>
          <Link to="/fight" style={{ display: "flex", alignItems: "center" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/1408/1408998.png" style={{ height: "20px", width: "20px", paddingRight: "5px" }} />
            <span>Fight</span>
          </Link>
        </li>
      </ul>
      <h1>Hello, {userInfo.firstName}!</h1>
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      <center>
        <div className="game-box">
          
          <p style={{ color: "black" }}>(Pokémon Gotta catch 'em all) It's you and me I know it's my destiny (Pokémon) Oh, you're my best friend In a world we must defend (Pokémon Gotta catch 'em all) A heart so true Our courage will pull us through You teach me and I'll teach you (Ooh, ooh) Pokémon! (Gotta catch 'em all) Gotta catch 'em all Yeah</p>
        </div>
      </center>

      <br />
    </nav>
  );
}
