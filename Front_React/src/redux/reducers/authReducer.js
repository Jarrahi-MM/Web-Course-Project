import {SET_TOKEN_USERNAME} from "../action_creators/types";

const initState = {
    username: 'guest',
    authorization: 'token '
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TOKEN_USERNAME:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};

export default authReducer