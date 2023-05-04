import React, { useState, useEffect } from 'react';

function SavedGames() {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    fetch('https://localhost:4000/save')
      .then(response => response.json())
      .then(data => setSavedGames(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Saved Games</h2>
      <ul>
        {savedGames.map(game => (
          <li key={game._id}>
            <p>Name: {game.name}</p>
            <p>Date: {game.date}</p>
            <p>Score: {game.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedGames;
