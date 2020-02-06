import {CLOSE_MODAL, OPEN_MODAL} from "./types";

//action: comment_create, post_create, comment_edit, post_edit
//address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
//initialText: the initial html(when editing)
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