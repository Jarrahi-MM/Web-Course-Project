import {APPEND_CHANNEL_POSTS, CHANNEL_HOLD_ON, CLEAR_CHANNEL_POSTS} from "../action_creators/types";

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
                posts: [...state.posts,...action.payload.posts]
            };
        case CLEAR_CHANNEL_POSTS:
            return {
                ...initState
            }
        case CHANNEL_HOLD_ON:
            return {
                ...state,
                hasMoreItems: false
            }
        default:
            return state
    }
};

export default channelReducer