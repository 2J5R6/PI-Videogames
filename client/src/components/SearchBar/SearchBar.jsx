import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideogames } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('local'); // Por defecto, se selecciona la base de datos local
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    dispatch(fetchVideogames(query, source)); // Pasamos la fuente como segundo argumento
  };

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar videojuego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select value={source} onChange={(e) => setSource(e.target.value)} className={styles.sourceSelect}>
          <option value="local">Base de datos local</option>
          <option value="api">API externa</option>
        </select>
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
