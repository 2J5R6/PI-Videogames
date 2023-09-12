import axios from 'axios';

// Configurar axios para usar el base URL de tu servidor local con el prefijo /ENJOY
axios.defaults.baseURL = 'http://localhost:3001/ENJOY';

// Constantes de acción
export const SET_VIDEOGAMES = 'SET_VIDEOGAMES';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Acciones creadoras
export const setVideogames = (videogames) => ({
  type: SET_VIDEOGAMES,
  payload: videogames,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Acción thunk para obtener videojuegos basados en una consulta y una fuente (local o API)
export const fetchVideogames = (query = '', source = 'local') => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const url = query 
        ? `/videogames/name?name=${query}`
        : '/videogames';

      const response = await axios.get(url);
      dispatch(setVideogames(response.data));
      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

// Acción thunk para obtener videojuegos filtrados
export const fetchFilteredVideogames = (filterType, filterValue) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      // Construir la URL basada en el tipo de filtro y su valor
      let url = `/videogames/filter/${filterType}`;

      // Manejar los rangos de fecha y rating
      if (filterType === 'releaseDate') {
        url += `?start=${filterValue.start}&end=${filterValue.end}`;
      } else if (filterType === 'rating') {
        url += `?start=${filterValue.start}&end=${filterValue.end}`;
      } else {
        url += `?value=${filterValue}`;
      }

      const response = await axios.get(url);
      dispatch(setVideogames(response.data));
      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

