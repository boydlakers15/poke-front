import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/leaderboard')
      .then(response => setGames(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSave = () => {
    const gameData = {
      playerPokemon: 'Pikachu',
      opponentPokemon: 'Charizard',
      winner: 'player',
      date: Date.now()
    };

    axios.post('http://localhost:4000/save', gameData)
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Pok%C3%A9mon_TCG_Online_Logo.png" alt="Pokemon TCG Online Logo" className="logo" />
      </div>
      <center> <img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="350" height="350" /></center>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Player Pokemon</th>
            <th>Opponent Pokemon</th>
            <th>Winner</th>
            <th>Turns</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game._id}>
              <td>{game.playerPokemon}</td>
              <td>{game.opponentPokemon}</td>
              <td>{game.winner}</td>
              <td>{game.turns}</td>
              <td>{new Date(game.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save Game</button>
    </div>
  );
}

export default Leaderboard;
