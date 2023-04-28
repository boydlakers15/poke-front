import React, { useState } from 'react';
import './Home.css';

export default function Home() {
  const [show, setShow] = useState(false);
    return (
    <nav className="nav">
      <p className="section">
          <center><img src="https://server.emulator.games/images/gameboy-color/pokemon-blue-version-ua.jpg" alt="Pokemon Blue Version" width="450" height="450" /></center>
        <br/></p>
      <p>(Pokémon
        Gotta catch 'em all) It's you and me
        I know it's my destiny (Pokémon)
        Oh, you're my best friend
        In a world we must defend (Pokémon
        Gotta catch 'em all) A heart so true
        Our courage will pull us through
        You teach me and I'll teach you (Ooh, ooh)
        Pokémon! (Gotta catch 'em all)
        Gotta catch 'em all
        Yeah</p>
      
      
    </nav>
    
    )
    

}