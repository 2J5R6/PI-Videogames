// src/components/SearchBar/SearchBar.jsx

import React from 'react';
import styles from './SearchBar.module.css'; // Asegúrate de tener este archivo CSS

function SearchBar() {
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Buscar videojuego..." />
      <button>Buscar</button>
    </div>
  );
}

export default SearchBar;
