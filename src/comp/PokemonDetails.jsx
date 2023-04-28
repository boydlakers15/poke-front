import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json/${id}/${info}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [id, info]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.name.english}</h1>
      <p>Type: {data.type.join(', ')}</p>
      <p>HP: {data.base.HP}</p>
      <p>Attack: {data.base.Attack}</p>
      <p>Defense: {data.base.Defense}</p>
      <p>Sp. Attack: {data.base['Sp. Attack']}</p>
      <p>Sp. Defense: {data.base['Sp. Defense']}</p>
      <p>Speed: {data.base.Speed}</p>
    </div>
  );
}

export default PokemonDetails;
