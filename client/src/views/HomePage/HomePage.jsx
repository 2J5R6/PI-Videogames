import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogames } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameCard from '../../components/GameCard/GameCard';
import Filters from '../../components/Filters/Filters';
import styles from './HomePage.module.css';

function HomePage() {
  const dispatch = useDispatch();

  // Obtener los videojuegos del estado de Redux
  const videogames = useSelector((state) => state.videogames);

  // Obtener solo los últimos 18 videojuegos para mostrar
  const displayedGames = videogames.slice(-18);

  // Llamar a la acción fetchVideogames cuando el componente se monta
  useEffect(() => {
    dispatch(fetchVideogames());
  }, [dispatch]);

  // Verificar si los videojuegos están cargando
  const isLoading = useSelector((state) => state.loading);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      {isLoading ? (
        // Mostrar una animación o imagen de carga mientras los videojuegos están cargando
        <div className={styles.loadingContainer}>
          <img src={process.env.PUBLIC_URL + '/assets/LogoVideogames.png'} alt='Cargando...' className={styles.loadingLogo} />
        </div>
      ) : (
        // Mostrar las tarjetas de videojuegos una vez que hayan cargado
        <div className={styles.gameCardsContainer}>
          {displayedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
