import api from '../../../lib/api/apiCall'
import {
    FETCH_IMAGES_REQUEST,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_FAILURE
} from '../constants/images'


export const fetchImagesRequest = () => {
    return {
        type: FETCH_IMAGES_REQUEST,
        payload: {}
    }
}

export const fetchImagesSuccess = (images) => {
    return {
        type: FETCH_IMAGES_SUCCESS,
        payload: { images: images }
    }
}

export const fetchImagesFailure = (error) => {
    return {
        type: FETCH_IMAGES_FAILURE,
        payload: { error: error }
    }
}

export function fetchImages() {
    return function(dispatch) {
        dispatch(fetchImagesRequest)

        api.get(`/images`, { }).then(
            response => dispatch(fetchImagesSuccess(response))
        )
        .catch(error => {
            dispatch(fetchImagesFailure(error))
        })
    }
}
