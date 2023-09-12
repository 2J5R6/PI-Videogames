
import React from 'react';
import styles from './GameCard.module.css';

const GameCard = ({ game }) => {
  return (
    <div className={styles.card}>
      <img src={game.image} alt={game.name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{game.name}</h2>
        <p className={styles.cardDescription}>{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
