// src/components/GameCard/GameCard.jsx

import React from 'react';
import styles from './GameCard.module.css'; // Asegúrate de tener este archivo CSS

function GameCard({ game }) {
  return (
    <div className={styles.card}>
      <img src={game.image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>{game.genres.join(', ')}</p>
    </div>
  );
}

export default GameCard;
