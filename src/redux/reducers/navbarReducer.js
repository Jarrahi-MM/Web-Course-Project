import {SEARCH_LOADING_DONE, SEARCH_LOADING_STARTED, STORE_CHANNELS} from "../action_creators/types";

const initState = {
    channels:[],
    inChannel:{name: 'Go to a channel'},
    searchIsLoading:false,
};

const navbarReducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_CHANNELS:
            return {
                ...state,
                channels: action.payload
            }
        case SEARCH_LOADING_DONE:
            return {
                ...state,
                searchIsLoading: false
            }
        case SEARCH_LOADING_STARTED:
            return {
                ...state,
                searchIsLoading: true
            }
        default:
            return state
    }
};

export default navbarReducer