import {CHANNEL_MOUNTED, CHANNEL_UNMOUNTED, STORE_CHANNELS, UNREAD_ALERTS_COUNT} from "./types";

const fake_channels = [
    'Sports',
    'Jokes',
    'Home',
];

const fake_unread_alerts_count = 2;

export const loadChannels = () => (dispatch, state) => {
    let url = new URL('http://127.0.0.1:8000/api1/profiles/' + state().auth.username);
    fetch(url
    ).then(function (resp) {
        console.log(resp)
        if(resp.ok){
            resp.json().then(function (json) {
                console.log(json)
                let {user: {followings}} = json
                dispatch({
                    'type': STORE_CHANNELS,
                    'payload': followings,
                })
            })
        }
    })
    // dispatch({
    //     type: STORE_CHANNELS,
    //     payload: fake_channels,
    // })
};

export const mountedChannel = (channelName) => (dispatch, state) => {
    dispatch({
        type: CHANNEL_MOUNTED,
        payload: channelName,
    })
};

export const unmountedChannel = () => (dispatch, state) => {
    dispatch({
        type: CHANNEL_UNMOUNTED,
    })
};

export const setUnreadAlerts = () => (dispatch, state) => {
    // let url = new URL('http://192.168.1.1:8080/api/unreadalertscount')
    // fetch(url).then((resp)=>resp.json()).then((json)=>{
    //     dispatch({
    //         type: UNREAD_ALERTS_COUNT,
    //         payload: json.unreadAlerts
    //     })
    // })
    dispatch({
        type: UNREAD_ALERTS_COUNT,
        payload: fake_unread_alerts_count
    })
};

export const readAllAlerts = () => (dispatch, state) => {
    dispatch({
        type: UNREAD_ALERTS_COUNT,
        payload: 0
    })
};