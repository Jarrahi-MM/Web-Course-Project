import {APPEND_ALERTS} from "../action_creators/types";

const initState = {
    alerts: [],
    hasMoreItems: true,
    checkpoint: null,
};

const alertReducer = (state = initState, action) => {
    switch (action.type) {
        case APPEND_ALERTS:
            return {
                ...state,
                ...action.payload,
                alerts: [...state.alerts,...action.payload.alerts]
            };
        default:
            return state
    }
};

export default alertReducer