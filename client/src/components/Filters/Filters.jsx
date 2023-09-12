import React, { useState } from 'react'; // Importamos useState para manejar el estado local
import { useDispatch } from 'react-redux';
import { fetchFilteredVideogames } from '../../redux/actions';
import styles from './Filters.module.css';

function Filters() {
  const dispatch = useDispatch();

  // Estado local para manejar los rangos de fecha y rating
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [ratingRange, setRatingRange] = useState({ start: 1, end: 5 });

  const handleFilterChange = (event) => {
    const filterType = event.target.name;
    let filterValue = event.target.value;

    // Para los filtros de fecha y rating, enviar un rango
    if (filterType === 'releaseDateStart' || filterType === 'releaseDateEnd') {
      setDateRange(prevState => ({ ...prevState, [filterType]: filterValue }));
      filterValue = dateRange;
    } else if (filterType === 'ratingStart' || filterType === 'ratingEnd') {
      setRatingRange(prevState => ({ ...prevState, [filterType]: filterValue }));
      filterValue = ratingRange;
    }

    dispatch(fetchFilteredVideogames(filterType, filterValue));
  };

  return (
    <div className={styles.filtersContainer}>
      <label>Genre:</label>
      <select name="genre" onChange={handleFilterChange}>
        <option value="Action">Action</option>
        <option value="Indie">Indie</option>
        <option value="Adventure">Adventure</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Strategy</option>
        <option value="Shooter">Shooter</option>
        <option value="Casual">Casual</option>
        <option value="Simulation">Simulation</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Arcade">Arcade</option>
        <option value="Platformer">Platformer</option>
        <option value="Massively Multiplayer">Massively Multiplayer</option>
        <option value="Racing">Racing</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Family">Family</option>
        <option value="Board Games">Board Games</option>
        <option value="Educational">Educational</option>
        <option value="Card">Card</option>
      </select>

      <label>Platform:</label>
      <select name="platform" onChange={handleFilterChange}>
        <option value="PC">PC</option>
        <option value="PlayStation 5">PlayStation 5</option>
        <option value="Xbox Series S/X">Xbox Series S/X</option>
        <option value="PlayStation 4">PlayStation 4</option>
        <option value="PlayStation 3">PlayStation 3</option>
        <option value="Xbox 360">Xbox 360</option>
        <option value="Xbox One">Xbox One</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Linux">Linux</option>
        <option value="macOS">macOS</option>
        <option value="Android">Android</option>
        <option value="iOS">iOS</option>
        <option value="PS Vita">PS Vita</option>
        <option value="Web">Web</option>
      </select>

      <label>Release Date Start:</label>
      <input type="date" name="releaseDateStart" onChange={handleFilterChange} />

      <label>Release Date End:</label>
      <input type="date" name="releaseDateEnd" onChange={handleFilterChange} />

      <label>Rating Start:</label>
      <select name="ratingStart" onChange={handleFilterChange}>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>

      <label>Rating End:</label>
      <select name="ratingEnd" onChange={handleFilterChange}>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>

      <label>Developer:</label>
      <input type="text" name="developer" placeholder="Enter developer name" onChange={handleFilterChange} />

      <label>User Created:</label>
      <select name="userCreated" onChange={handleFilterChange}>
        <option value="true">User Created</option>
        <option value="false">Not User Created</option>
      </select>
    </div>
  );
}

export default Filters;
