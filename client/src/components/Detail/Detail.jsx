import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogameById } from '../../redux/actions'; // Asumiendo que tienes una acción para buscar un videojuego por ID
import styles from './Detail.module.css';

function Detail({ match }) {
  const dispatch = useDispatch();
  const videogame = useSelector(state => state.selectedVideogame); // Asumiendo que tienes un estado para el videojuego seleccionado

  useEffect(() => {
    const videogameId = match.params.id;
    dispatch(fetchVideogameById(videogameId));
  }, [dispatch, match.params.id]);

  return (
    <div className={styles.detailContainer}>
      {/* Nombre del Videojuego */}
      <h1 className={styles.title}>{videogame.name}</h1>

      {/* Imagen del videojuego */}
      {videogame.image && <img src={videogame.image} alt={videogame.name} className={styles.image} />}

      {/* Descripción */}
      <p className={styles.description}>{videogame.description}</p>

      {/* Plataformas disponibles */}
      <div className={styles.platforms}>
        <h2>Plataformas:</h2>
        <ul>
          {videogame.platforms && videogame.platforms.map(platform => (
            <li key={platform}>{platform}</li>
          ))}
        </ul>
      </div>

      {/* Fecha de lanzamiento */}
      <div className={styles.releaseDate}>
        <h2>Fecha de Lanzamiento:</h2>
        <p>{videogame.releaseDate}</p>
      </div>

      {/* Calificación */}
      <div className={styles.rating}>
        <h2>Calificación:</h2>
        <p>{videogame.rating}</p>
      </div>

      {/* Géneros asociados */}
      <div className={styles.genres}>
        <h2>Géneros:</h2>
        <ul>
          {videogame.genres && videogame.genres.map(genre => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
