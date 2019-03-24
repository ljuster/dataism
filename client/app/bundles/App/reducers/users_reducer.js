import * as constants from '../constants/users'


export default function(state = {users: []}, action) {
    const { type, payload } = action

    switch (type) {
        case constants.FETCH_USERS_SUCCESS:
            return {...state, users: payload.users }
        case constants.FETCH_USERS_REQUEST:
           return {...state, loadingUsers: true }
      case constants.CLEAR_USERS_REQUEST:
           return {...state, users: []}
        default:
            return state
    }
}