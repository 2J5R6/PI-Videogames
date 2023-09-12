
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogames } from '../redux/actions';
import SearchBar from '../components/SearchBar/SearchBar';
import GameCard from '../components/GameCard/GameCard';
import Filters from '../components/Filters/Filters';
import styles from './HomePage.module.css';

function HomePage() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(fetchVideogames());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      <div className={styles.gameCardsContainer}>
        {videogames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
