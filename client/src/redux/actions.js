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
    dispatch(setLoading(true)); // Establecer el estado de carga en verdadero

    try {
      // Construir la URL basada en la consulta
      const url = query 
        ? `/videogames/name?name=${query}`  // Ruta para buscar videojuegos por nombre en la base de datos local
        : '/videogames';                    // Ruta para obtener todos los videojuegos de la base de datos local

      // Realizar la llamada a la API
      const response = await axios.get(url);

      // Almacenar los videojuegos en el estado de Redux
      dispatch(setVideogames(response.data));

      // Establecer el estado de carga en falso
      dispatch(setLoading(false));

    } catch (error) {
      // En caso de error, almacenar el mensaje de error en el estado y establecer el estado de carga en falso
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};
