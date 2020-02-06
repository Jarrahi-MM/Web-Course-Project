import {ADD_POST, APPEND_ALERTS} from "./types";

export const loadPost = (channelId,postNumber) => (dispatch,getState) => {
    let url = new URL(`http://127.0.0.1:8000/api1/posts/${channelId}/${postNumber}/`)
    fetch(url,{
        headers: {
            'Authorization': getState().auth.authorization
        }
    }).then(resp => {
        if (resp.ok) {
            resp.json().then(json => {
                dispatch({
                    type: ADD_POST,
                    payload: json
                })
            })
        }
    });
};