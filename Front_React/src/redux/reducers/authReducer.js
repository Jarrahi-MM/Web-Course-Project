import {SET_TOKEN_USERNAME} from "../action_creators/types";

const initState = {
    username: 'jarrahi1',
    authorization: 'Token 7e2942116f69c2e8b0bff80a064a58f1709d3371'
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