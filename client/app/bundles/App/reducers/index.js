import { combineReducers } from 'redux'
import ImagesReducer from './images_reducer'
import UsersReducer from './users_reducer'
import CheckoutReducer from './checkout_reducer'

const rootReducer = combineReducers({
    checkout: CheckoutReducer,
    images: ImagesReducer,
    users: UsersReducer
});

export default rootReducer