import api from '../../../lib/api/apiCall'
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CLEAR_USERS_REQUEST
} from '../constants/users'


export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
        payload: {}
    }
}

export const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: { users: users }
    }
}

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: {error: error }
    }
}

export const clearUsers = () => {
    return {
        type: CLEAR_USERS_REQUEST,
        payload: {}
    }
}

export function fetchUsers(name) {
    return function(dispatch) {
        dispatch(fetchUsersRequest)

        api.get(`/users`, { name: name }).then(
            response => dispatch(fetchUsersSuccess(response))
        )
        .catch(error => {
            dispatch(fetchUsersFailure(error))
        })
    }
}
