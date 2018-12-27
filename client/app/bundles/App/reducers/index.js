import { combineReducers } from 'redux'
import ImagesReducer from './images_reducer'
import CheckoutReducer from './checkout_reducer'

const rootReducer = combineReducers({
    checkout: CheckoutReducer,
    images: ImagesReducer
});

export default rootReducer