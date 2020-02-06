import {CLOSE_MODAL, OPEN_MODAL} from "./types";

export const openModal = (action, address, initialText = '') => (dispatch, getState) => {
    dispatch({
        type: OPEN_MODAL,
        payload: {
            action,
            address,
            initialText,
        }
    })
}

export const closeModal = () => (dispatch, getState) => {
    dispatch({
        type: CLOSE_MODAL
    })
}