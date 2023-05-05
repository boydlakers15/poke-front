import React, { useState, useEffect } from 'react';
import {Box, List, ListItem, ListItemText ,Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Pokefight.module.css';
import Leaderboard from './leaderboard';
import ReactPaginate from 'react-js-pagination';

const useStyles = makeStyles({
  card: {
    width: 350,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    margin: '20px auto',
    height: 490,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: '10px 0',
    color: '#c80000',
    textShadow: '2px 2px #fff',
    paddingTop: '8px'
  },
  opptitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#c80000',
    textShadow: '2px 2px #fff',
    
  },
  wintitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: '10px 0',
    color: '#c80000',
    textShadow: '2px 2px #fff',
    paddingTop: '8px'
  },
  pos: {
    marginBottom: 12,
    textTransform: 'capitalize',
    color: '#333',
    fontWeight: 'bold',
    
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

const Pokefight = () => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [pictureUrl, setPictureUrl] = useState('');
  const [winnerPictureUrl, setWinnerPictureUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 28;
  

  useEffect(() => {
    fetch('https://pokemon-backend.herokuapp.com/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data.map((pokemon, index) => ({ ...pokemon, id: index + 1 }))))
      .catch(error => console.log(error))
  }, []);
  

  useEffect(() => {
    if (playerPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon.name.english.toLowerCase()}`)
        .then(response => response.json())
        .then(data => setPictureUrl(data.sprites.front_default))
        
    }
  }, [playerPokemon]);

  useEffect(() => {
    if (winner) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${winner.name.english.toLowerCase()}`)
        .then(response => response.json())
        .then(data => setWinnerPictureUrl(data.sprites.front_default))
    }
  }, [winner]);
  

  const handleSelectPokemon = (pokemon) => {
    setPlayerPokemon(pokemon);
    setOpponentPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
    setWinner(null);
  }

  const handleSave = (game) => {
    saveGame(game);
   
  };
  
  const saveGame = (game) => {
    if (!game.playerPokemon || !game.opponentPokemon || !game.winner) {
      console.log('Missing required fields in game object');
      return;
    }
  
    fetch('https://pokemon-backend.herokuapp.com/save', {
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
  
  const calculateTotalStats = (pokemon) => {
    let totalStats = 0;
    for (let stat in pokemon.base) {
      totalStats += pokemon.base[stat];
    }
    return totalStats;
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }
  
  
  const calculateWinnerTotalStats = () => {
    if (winner === null || winner === 'tie') {
      return null;
    } else {
      return calculateTotalStats(winner);
    }
  }
  
  
  const filteredList = pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentItems = filteredList.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);


  return (
    <div className={styles.container}>
      
      <Leaderboard/>
      <div>
      <br />
    </div>
      {playerPokemon && opponentPokemon && (
        <div className={styles.pokemonContainer}>
            <Card className={classes.card} style={{ backgroundImage: "url('https://i.pinimg.com/236x/fc/c3/68/fcc3688f92afd5e3390edf3f7cd3ab73.jpg')", backgroundSize: "cover" }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Your Pokemon
                </Typography>
                <CardContent>
                
                <Typography variant="h5" component="h2">
                    {playerPokemon.name.english}
                </Typography>
                <center><img src={pictureUrl} alt={playerPokemon.name.english} /></center>
                <Typography className={classes.pos} color="textSecondary">
                    {playerPokemon.type.join(', ')}
                </Typography>
                <Typography variant="body2" component="p" style={{ paddingTop: '48px',  fontWeight: 'bold' }}>
                    HP: {playerPokemon.base.HP} <br />
                    Attack: {playerPokemon.base.Attack} <br />
                    Defense: {playerPokemon.base.Defense} <br />
                    Speed: {playerPokemon.base.Speed} <br />
                    <br /><br /><br /><br /><br />
                </Typography>
                </CardContent>
            </Card> 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Card style={{ backgroundImage: "url('https://i.pinimg.com/236x/fc/c3/68/fcc3688f92afd5e3390edf3f7cd3ab73.jpg')", backgroundSize: "cover" }} className={classes.card}>
                <CardContent>
                <Typography  className={classes.opptitle} color="textSecondary" gutterBottom>
                    Opponent's Pokemon
                </Typography>
                <br />
                <Typography variant="h5" component="h2">
                    {opponentPokemon.name.english}
                </Typography>
                <center><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentPokemon.id}.png`} alt={opponentPokemon.name.english} /></center>
                <Typography className={classes.pos} color="textSecondary">
                    {opponentPokemon.type.join(', ')}
                </Typography>
                <br /><br />
                <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>
                    HP: {opponentPokemon.base.HP} <br />
                        Attack: {opponentPokemon.base.Attack} <br />
                        Defense: {opponentPokemon.base.Defense} <br />
                        Speed: {opponentPokemon.base.Speed} <br />
                </Typography>
                </CardContent>
            </Card>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {winner && (
                <Card className={classes.card} style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZt76yPdP_8MyBFnE37YQx7UjO0peaupg1hACOOdTvSZdmVaCQRKuG-vM7pUoC4IBI78&usqp=CAU')", backgroundSize: "cover"}}>
                  <Typography className={classes.wintitle} color="textSecondary" gutterBottom>
                    Winner
                  </Typography>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {winner.name.english}
                    </Typography>
                    <center><img src={winnerPictureUrl} alt={winner.name.english} /></center>
                    <Typography className={classes.pos} color="textSecondary">
                      {winner.type.join(', ')}
                    </Typography>
                    <Typography className={styles.winStats} variant="body2" component="p" style={{fontWeight: "bold"}}>
                      HP: {winner.base.HP} <br />
                      Attack: {winner.base.Attack} <br />
                      Defense: {winner.base.Defense} <br />
                      Speed: {winner.base.Speed} <br />
                    </Typography>
                  </CardContent>
                </Card>
              )}
            <br /> 
        </div>)}
        <div className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleFight} className={styles.fightButton}>Fight!</Button>
          &nbsp;
          <Button variant="contained" color="secondary" className={styles.saveButton} onClick={() => handleSave({
              playerPokemon: playerPokemon.name.english,
              opponentPokemon: opponentPokemon.name.english,
              winner: winner?.name?.english,
              date: new Date().toLocaleString(),
          })}>
            Save Game
          </Button>
        </div>
        <br />
        <div>
          <input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Typography variant="h4">Pokemon List</Typography>
            <Typography variant="h6" className={styles.selectText}>
                Choose your Pokemon:
            </Typography>
            <Grid container spacing={4} className={styles.selectContainer}>
              {currentItems.map(pokemon => (
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
            <ReactPaginate
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={filteredList.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              innerClass={styles.pagination}
              itemClass={styles.pageItem}
              linkClass={styles.pageLink}
              activeLinkClass={styles.activePageLink}
            />

    </div>
);
}

export default Pokefight;