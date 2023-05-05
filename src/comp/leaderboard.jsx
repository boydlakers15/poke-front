import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.module.css';

function Leaderboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('https://pokemon-backend.herokuapp.com/leaderboard')
      .then(response => setGames(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="leaderboard-container">
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      <center>
        <img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="350" height="350" />
      </center>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Player Pokemon</th>
            <th>Opponent Pokemon</th>
            <th>Winner</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game._id}>
              <td>{game.playerPokemon}</td>
              <td>{game.opponentPokemon}</td>
              <td>{game.winner}</td>
              <td>{new Date(game.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
