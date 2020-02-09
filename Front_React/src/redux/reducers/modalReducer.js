import {CLOSE_MODAL, OPEN_MODAL} from "../action_creators/types";

const initState = {
    modalIsOpen: false,
    action: '',
    address: {},
    initialText: '',
    initialPostEditTitle: ''
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                modalIsOpen: true,
                ...action.payload
            };
        case CLOSE_MODAL:
            return {
                ...initState
            }
        default:
            return state
    }
};

export default modalReducer