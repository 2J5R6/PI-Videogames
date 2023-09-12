

import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../GameCard/GameCard';
import styles from './GameList.module.css';

const GameList = () => {
  const videogames = useSelector(state => state.videogames);

  return (
    <div className={styles.listContainer}>
      {videogames.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
