import {SET_TOKEN_USERNAME} from "./types";

export const loadTokenAndUsernameFromCookies = (cookies) => (dispatch, getState) => {
    dispatch({
        type: SET_TOKEN_USERNAME,
        payload: {
            username: cookies.get('userName'),
            authorization: 'token ' + cookies.get('myToken')
        }
    })
}