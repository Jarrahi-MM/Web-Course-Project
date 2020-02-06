import {SET_TOKEN_USERNAME} from "./types";

export const loadTokenAndUsernameFromCookies = (cookies) => (dispatch, getState) => {
    return //todo for test only
    let username = cookies.get('userName')
    let token = cookies.get('myToken')
    // if (!token && window.location.href != '/login') {
    //     window.location.href = '/login'
    //     return
    // }
    dispatch({
        type: SET_TOKEN_USERNAME,
        payload: {
            username: username,
            authorization: 'token ' + token
        }
    })
}