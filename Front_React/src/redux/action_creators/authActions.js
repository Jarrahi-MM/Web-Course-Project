import {SET_TOKEN_USERNAME} from "./types";

export const loadTokenAndUsernameFromCookies = (cookies) => (dispatch, getState) => {
    let username = cookies.get('userName')
    let token = cookies.get('myToken')
    dispatch({
        type: SET_TOKEN_USERNAME,
        payload: {
            username: username,
            authorization: 'token ' + token
        }
    })
}