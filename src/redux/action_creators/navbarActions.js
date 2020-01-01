import {CHANNEL_MOUNTED, CHANNEL_UNMOUNTED, STORE_CHANNELS} from "./types";

const fake_channels = [
    {
        name: 'Sports',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
    {
        name: 'Jokes',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
    {
        name: 'Home',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
]

export const loadChannels = () => (dispatch, state) => {
    // let url = new URL('http://192.168.1.1:8080/api/channels');
    // return fetch(url
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
}

export const mountedChannel = (channelName) => (dispatch,state) => {
    dispatch({
        type:  CHANNEL_MOUNTED,
        payload: channelName,
    })
}

export const unmountedChannel = () => (dispatch,state) => {
    dispatch({
        type:  CHANNEL_UNMOUNTED,
    })
}