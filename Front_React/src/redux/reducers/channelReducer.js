import {APPEND_CHANNEL_POSTS} from "../action_creators/types";

const initState = {
    posts: [],
    hasMoreItems: true,
    checkpoint: null,
};

const channelReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEND_CHANNEL_POSTS:
            return {
                ...state,
                ...action.payload,
                alerts: [...state.posts,...action.payload.posts]
            };
        default:
            return state
    }
};

export default channelReducer