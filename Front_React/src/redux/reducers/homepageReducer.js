import {APPEND_POSTS, FOLLOWED_TAB, NEW_TAB} from "../action_creators/types";

const initState = {
    postObjs: [],
    hasMoreItems: true,
    checkpoint: null,
    activeTab: FOLLOWED_TAB
};

const homepageReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEND_POSTS:
            return {
                ...state,
                ...action.payload,
                postObjs: [...state.postObjs,...action.payload.postObjs]
            };
        case NEW_TAB:
            return {
                ...initState,
                activeTab: action.payload
            };
        default:
            return state
    }
};

export default homepageReducer