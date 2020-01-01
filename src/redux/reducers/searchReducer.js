const initState = {
    searchResults: {}
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH RESULTS':
            return {
                ...state,
                searchResults: action.payload
            }
        default:
            return state
    }
};

export default searchReducer