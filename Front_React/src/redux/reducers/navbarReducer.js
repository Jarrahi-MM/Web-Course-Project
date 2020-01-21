import {
    CHANNEL_MOUNTED,
    CHANNEL_UNMOUNTED,
    SEARCH_LOADING_DONE,
    SEARCH_LOADING_STARTED,
    STORE_CHANNELS, UNREAD_ALERTS_COUNT
} from "../action_creators/types";

const initState = {
    channels:[],
    inChannel:'Go to a channel',
    searchIsLoading:false,
    unreadAlerts: 0,
};

const navbarReducer = (state = initState, action) => {
    switch (action.type) {
        case UNREAD_ALERTS_COUNT:
            return {
                ...state,
                unreadAlerts: action.payload
            };
        case CHANNEL_MOUNTED:
            return {
                ...state,
                inChannel: action.payload
            };
        case CHANNEL_UNMOUNTED:
            return {
                ...state,
                inChannel: initState.inChannel
            };
        case STORE_CHANNELS:
            return {
                ...state,
                channels: action.payload
            };
        case SEARCH_LOADING_DONE:
            return {
                ...state,
                searchIsLoading: false
            };
        case SEARCH_LOADING_STARTED:
            return {
                ...state,
                searchIsLoading: true
            };
        default:
            return state
    }
};

export default navbarReducer