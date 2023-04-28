import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/save')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div>
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
    </div>
  );
}

export default Leaderboard;
