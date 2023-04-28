// import React, { useState, useEffect } from 'react';
// import styles from './Pokefight.module.css';
// import Leaderboard from "./leaderboard";
// import fightStyles from "./styles.module.css";



// function Pokefight() {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [playerPokemon, setPlayerPokemon] = useState(null);
//   const [opponentPokemon, setOpponentPokemon] = useState(null);
//   const [winner, setWinner] = useState(null);
//   const [pictureUrl, setPictureUrl] = useState('');

//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
//       .then(response => response.json())
//       .then(data => setPokemonList(data))
//       .catch(error => console.log(error))
//   }, []);

//   useEffect(() => {
//     if (playerPokemon) {
//       fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon.name.english.toLowerCase()}`)
//         .then(response => response.json())
//         .then(data => setPictureUrl(data.sprites.front_default))
//         .catch(error => console.log(error))
//     }
//   }, [playerPokemon]);

//   const handleSelectPokemon = (pokemon) => {
//     setPlayerPokemon(pokemon);
//     setOpponentPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
//     setWinner(null);
//   }

//   const calculateTotalStats = (pokemon) => {
//     let totalStats = 0;
//     for (let stat in pokemon.base) {
//       totalStats += pokemon.base[stat];
//     }
//     return totalStats;
//   }

//   const handleFight = () => {
//     const playerStats = calculateTotalStats(playerPokemon);
//     const opponentStats = calculateTotalStats(opponentPokemon);
//     if (playerStats > opponentStats) {
//       setWinner(playerPokemon);
//     } else if (opponentStats > playerStats) {
//       setWinner(opponentPokemon);
//     } else {
//       setWinner('tie');
//     }
//   }

//   return (
//       <div className={styles.container}>
//         <center>
//           <div className="pokemon-image img" mr={1}>
//             <img
//               src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg"
//               alt="Pokemon Blue Version"
//               width="150"
//               height="150"
//             />
//           </div>
//         </center>
//         <h1 className={styles.title}>Pokefight</h1>
        
//         <button onClick={handleFight} className={styles.fightButton}>
//           Fight!
//         </button>
//         {playerPokemon && opponentPokemon && (
//           <div className={styles.pokemonContainer}>
//             <div className={`${styles.card} card water`}>
//               <div className={`${styles.title} cursor`}>Your Pokemon</div>
//               <div className={styles.pokemonName}>
//                 {playerPokemon.name.english}
//               </div>
//               <img
//                 src={pictureUrl}
//                 alt={playerPokemon.name.english}
//                 className="ripple"
//               />
//               <div className={styles.pokemonType}>
//                 {playerPokemon.type.join(", ")}
//               </div>
//               <div className={styles.pokemonStats}>
//                 <div>HP: {playerPokemon.base.HP}</div>
//                 <div>Attack: {playerPokemon.base.Attack}</div>
//                 <div>Defense: {playerPokemon.base.Defense}</div>
//                 <div>Speed: {playerPokemon.base.Speed}</div>
//                 <div>
//                   Total Stats: {calculateTotalStats(playerPokemon)}
//                 </div>
//               </div>
//             </div>
    
//             <div className={`${styles.card} card`}>
//               <div className={styles.title}>Opponent's Pokemon</div>
//               <div className={styles.pokemonName}>
//                 {opponentPokemon.name.english}
//               </div>
//               <center>
//                 <img
//                   src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentPokemon.id}.png`}
//                   alt={opponentPokemon.name.english}
//                   className="ripple"
//                 />
//               </center>
//               <div className={styles.pokemonType}>
//                 {opponentPokemon.type.join(", ")}
//               </div>
//               <div className={styles.pokemonStats}>
//                 <div>HP: {opponentPokemon.base.HP}</div>
//                 <div>Attack: {opponentPokemon.base.Attack}</div>
//                 <div>Defense: {opponentPokemon.base.Defense}</div>
//                 <div>Speed: {opponentPokemon.base.Speed}</div>
//                 <div>
//                   Total Stats: {calculateTotalStats(opponentPokemon)}
//                 </div>
//               </div>
//             </div>
    
//             {winner && (
//               <div className={`${styles.card} card winner`}>
//                 <div className={styles.title}>
//                   Winner: {winner === "tie" ? "Tie" : winner.name.english}
//                 </div>
//                 <center>
//                   <img
//                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner.id}.png`}
//                     alt={winner.name.english}
//                   />
//                 </center>
//               </div>
//             )}
//           </div>
//         )}
    
//     <h6 className={styles.selectText}>Choose your Pokemon:</h6>
//       <div className={`${fightStyles.selectContainer} select-container`}>
//         {pokemonList.map((pokemon) => (
//           <div key={pokemon.id} className={`${styles.pokemonButton} pokemon-button`}>
//             <button onClick={() => handleSelectPokemon(pokemon)}>
//               <img
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
//                 alt={pokemon.name.english}
//                 className={styles.image}
//               />
//               <div className={styles.name}>{pokemon.name.english}</div>
//             </button>
//           </div>
//         ))}
//       </div>

// </div>
// );
// }

//export default Pokefight;
import React, { useState, useEffect } from 'react';
import {Box, List, ListItem, ListItemText ,Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Pokefight.module.css';
import Leaderboard from './leaderboard';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Pokefight = () => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [pictureUrl, setPictureUrl] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data))
      
  }, []);

  useEffect(() => {
    if (playerPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon.name.english.toLowerCase()}`)
        .then(response => response.json())
        .then(data => setPictureUrl(data.sprites.front_default))
        
    }
  }, [playerPokemon]);

  const handleSelectPokemon = (pokemon) => {
    setPlayerPokemon(pokemon);
    setOpponentPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
    setWinner(null);
  }

  const calculateTotalStats = (pokemon) => {
    let totalStats = 0;
    for (let stat in pokemon.base) {
      totalStats += pokemon.base[stat];
    }
    return totalStats;
  }

  // const saveLeaderboard = (game) => {
  //   fetch('/leaderboard', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(game),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setLeaderboard(data);
  //     })
      
  // };

  const handleSave = (game) => {
    saveGame(game);
   
  };
  
  const saveGame = (game) => {
    if (!game.playerPokemon || !game.opponentPokemon || !game.winner) {
      console.log('Missing required fields in game object');
      return;
    }
  
    fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Add the new game to the leaderboard
        
      })
      .catch(error => console.log(error));
  };
  
  
  
  

  const handleFight = () => {
    const playerStats = calculateTotalStats(playerPokemon);
    const opponentStats = calculateTotalStats(opponentPokemon);
  
    if (playerStats > opponentStats) {
      setWinner(playerPokemon);
    } else if (opponentStats > playerStats) {
      setWinner(opponentPokemon);
    } else {
      setWinner('tie');
    }
  
    if (winner !== null && winner !== 'tie') {
      const newGame = {
        playerPokemon: playerPokemon.name.english,
        opponentPokemon: opponentPokemon.name.english,
        winner: winner.name.english,
        date: new Date().toLocaleString(),
      };
  
      saveGame(newGame);
    }
  };
  
  

  
  
  
  

  return (
    <div className={styles.container}>
      <Leaderboard/>
      <div>
      <Box  display="flex" alignItems="center">
          <img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="350" height="350" />
      </Box>
      
    </div>
    <br />
      {playerPokemon && opponentPokemon && (
        <div className={styles.pokemonContainer}>
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Your Pokemon
                </Typography>
                <Typography variant="h5" component="h2">
                    {playerPokemon.name.english}
                </Typography>
                <center><img src={pictureUrl} alt={playerPokemon.name.english} /></center>
                <Typography className={classes.pos} color="textSecondary">
                    {playerPokemon.type.join(', ')}
                </Typography>
                <Typography variant="body2" component="p">
                    HP: {playerPokemon.base.HP} <br />
                    Attack: {playerPokemon.base.Attack} <br />
                    Defense: {playerPokemon.base.Defense} <br />
                    Speed: {playerPokemon.base.Speed} <br />
                    <br />
                </Typography>
                </CardContent>
            </Card>
            <br />
            
            <Card className={classes.card}>
                <CardContent>
                
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Opponent's Pokemon
                </Typography>
                <Typography variant="h5" component="h2">
                    {opponentPokemon.name.english}
                </Typography>
                <center><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentPokemon.id}.png`} alt={opponentPokemon.name.english} /></center>
                <Typography className={classes.pos} color="textSecondary">
                    {opponentPokemon.type.join(', ')}
                </Typography>
                <Typography variant="body2" component="p">
                    HP: {opponentPokemon.base.HP} <br />
                        Attack: {opponentPokemon.base.Attack} <br />
                        Defense: {opponentPokemon.base.Defense} <br />
                        Speed: {opponentPokemon.base.Speed} <br />
                       <br />
                </Typography>
                </CardContent>
            </Card>
            <br/>
            {winner && (
                <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="h5" component="h2">
                      {winner !== null ? `Winner: ${winner.name.english}` : 'No winner yet'}
                    </Typography>
                    {winner !== 'tie' && (
                        <div>
                        <center><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner.id}.png`} alt={winner.name.english} /></center>
                        <Typography variant="body2" component="p">
                            Total Stats: {calculateTotalStats(winner)}
                        </Typography>
                        </div>
                    )}
                    </CardContent>
                </Card>
                )}
                <br />
                <Button variant="contained" color="primary" onClick={handleFight} className={styles.fightButton}>Fight!</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleSave({
                        playerPokemon: playerPokemon.name.english,
                        opponentPokemon: opponentPokemon.name.english,
                        winner: winner.name.english,
                        date: new Date().toLocaleString(),
                      })
                    }
                  >
                    Save Game
                  </Button>

        </div>)}
        <Typography variant="h4">Pokemon List</Typography>
            <Typography variant="h6" className={styles.selectText}>
                Choose your Pokemon:
            </Typography>
            <Grid container spacing={4} className={styles.selectContainer}>
              {pokemonList.map(pokemon => (
                <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                  <Button variant="outlined" onClick={() => handleSelectPokemon(pokemon)} className={styles.selectButton}>
                    <div className={styles.selectPokemon}>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name.english} className={styles.selectImage} />
                      <div className={styles.selectName}>{pokemon.name.english}</div>
                    </div>
                  </Button>
                </Grid>
              ))}
            </Grid>

    </div>
);
}

export default Pokefight;