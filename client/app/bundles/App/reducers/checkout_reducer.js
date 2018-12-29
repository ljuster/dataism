export default function(state = null, action) {
    const { type, payload } = action

    switch (type) {
        case 'actions.ADD_TO_CART':
            return payload;
        case 'actions.REMOVE_FROM_CART':
            return payload;
        default:
            return state
    }
}