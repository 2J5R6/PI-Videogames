import axios from 'axios';

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

// Acción thunk para obtener videojuegos
// Esta acción realiza una llamada a la API para obtener videojuegos y luego
// actualiza el estado de Redux con los datos obtenidos.
export const fetchVideogames = () => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Establecer el estado de carga en verdadero
    try {
      const response = await axios.get('/api/videogames'); // Realizar la llamada a la API
      dispatch(setVideogames(response.data)); // Almacenar los videojuegos en el estado
      dispatch(setLoading(false)); // Establecer el estado de carga en falso
    } catch (error) {
      dispatch(setError(error.message)); // Almacenar el mensaje de error en el estado
      dispatch(setLoading(false)); // Establecer el estado de carga en falso
    }
  };
};
