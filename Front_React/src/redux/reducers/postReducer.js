import {ADD_POST} from "../action_creators/types";

const initState = {
    posts: {},
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST:
            let ch_p_key = [action.payload.channel, action.payload.postNumber].toString();
            console.log(state)
            return {
                posts: {
                    ...state.posts,
                    [ch_p_key]: action.payload
                }
            };
        default:
            return state
    }
};

export default postReducer