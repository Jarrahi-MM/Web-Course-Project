import {ADD_POST, APPEND_ALERTS} from "./types";

export const loadPost = (channelId,postNumber) => (dispatch,getState) => {
    let url = new URL(`http://127.0.0.1:8000/api1/post/${channelId}/${postNumber}/`)
    console.log('here in load post')
    fetch(url,{
        headers: {
            'Authorization': getState().auth.authorization
        }
    }).then(resp => {
        if (resp.ok) {
            resp.json().then(json => {
                console.log(json)
                dispatch({
                    type: ADD_POST,
                    payload: json
                })
            })
        }
    });
};