import {CHANNEL_MOUNTED, CHANNEL_UNMOUNTED, STORE_CHANNELS, UNREAD_ALERTS_COUNT} from "./types";

const fake_channels = [
    {
        name: 'Sports',
        imageURL:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    },
    {
        name: 'Jokes',
        imageURL:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    },
    {
        name: 'Home',
        imageURL:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    },
];

const fake_unread_alerts_count = 2;

export const loadChannels = () => (dispatch, state) => {
    // let url = new URL('http://192.168.1.1:8080/api/channels');
    // fetch(url
    // ).then(function (resp) {
    //     return resp.json();
    // }).then(function (json) {
    //     dispatch({
    //         'type': STORE_CHANNELS,
    //         'payload': json,
    //     })
    // });
    dispatch({
        type: STORE_CHANNELS,
        payload: fake_channels,
    })
};

export const mountedChannel = (channelName) => (dispatch,state) => {
    dispatch({
        type:  CHANNEL_MOUNTED,
        payload: channelName,
    })
};

export const unmountedChannel = () => (dispatch,state) => {
    dispatch({
        type:  CHANNEL_UNMOUNTED,
    })
};

export const setUnreadAlerts = () => (dispatch,state) => {
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

export const readAllAlerts = () => (dispatch,state) => {
    dispatch({
        type: UNREAD_ALERTS_COUNT,
        payload: 0
    })
};