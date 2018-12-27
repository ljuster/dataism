import api from '../../../lib/api/apiCall'

export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST'
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS'
// checkout reducer
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const fetchImagesRequest = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_IMAGES_REQUEST, payload: {} })

        api.get(`/images`, { }).then(
            (response) => {
                dispatch(fetchImagesSuccess(response.data))
            })
            .catch(error => {
                throw(error)
            });
    };
};

export const fetchImagesSuccess = (images) => {
  return (dispatch) => {
      dispatch({
          type: 'FETCH_IMAGES_SUCCESS',
          images: images
      })
  }
};
