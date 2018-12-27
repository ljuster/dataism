// File: modules/fetch.js
// Actions
export const REQUEST = 'modules/fetch/REQUEST'
export const SUCCESS = 'modules/fetch/SUCCESS'
export const ERROR = 'modules/fetch/ERROR'
// Reducer
export default function reducer(state, action={}) {
    const { storePath, data } = action;

    const fetchState = {
        fetching: false,
        error: false,
        data: null,
    }

    switch (action.type) {
        case REQUEST:
            fetchState.fetching = true;
            fetchState.error = false;
        case SUCCESS:
            fetchState.fetching = false;
            fetchState.error = false;
            fetchState.data = data;
        case ERROR:
            fetchState.fetching = false;
            fetchState.error = true;
    }
    // Replace the current state at `storePath` with the new
    // computed `fetchState`.
    return {
        ...state,
        [storePath]: {
            ...state[storePath],
            ...fetchState,
        }
    };
}
// Action creators
// Create a fetch action flow.
// * storePath: JSON key for location in the store, e.g. 'user'.
// * api: function that makes a REST call, return a promise
// * apiArgs: list of args to send to `api`
export function createFetch(storePath, api, apiArgs) {
    // Use Thunk middleware to dispatch asynchronously
    return async (dispatch) => {
        dispatch({ type: REQUEST, storePath });

        try {
            const data = await api(...apiArgs);
            dispatch({ type: SUCCESS, storePath, data });
        } catch (e) {
            dispatch({ type: ERROR, storePath });
        }
    };
}