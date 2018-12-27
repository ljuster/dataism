import * as actions from './actions'


export default function(state = {images: []}, action) {
    const { type, payload } = action

    switch (type) {
        case actions.FETCH_IMAGES_SUCCESS:
            return {...state, images: payload.images }
        case actions.FETCH_IMAGES_REQUEST:
           return {...state, loadingImages: true }
        default:
            return state
    }
}