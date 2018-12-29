import * as constants from '../constants/images'


export default function(state = {images: []}, action) {
    const { type, payload } = action

    switch (type) {
        case constants.FETCH_IMAGES_SUCCESS:
            return {...state, images: payload.images }
        case constants.FETCH_IMAGES_REQUEST:
           return {...state, loadingImages: true }
        default:
            return state
    }
}