const defaultState = {
    sorting: true,
};

function sortingReducer(state = defaultState, action) {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                sorting: true,
            };
        case 'STOP':
            return {
                ...state,
                sorting: false,
            };
        default:
            return state;
    }
}

export default sortingReducer;
