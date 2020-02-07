import {
    APPEND_CHANNEL_POSTS,
    CHANNEL_HOLD_ON, CLEAR_CHANNEL_POSTS
} from "./types";

// const fake_posts = {
//     posts: [
//         {
//             postNumber: 1,
//             channel: 2
//         },
//     ],
//     checkpoint: 'some date',
//     hasMoreItems: true
// };

export const loadMoreChannelPosts = (channelId) => (dispatch, getState) => {
    dispatch({ //cause this infinite scroller doesn't trust me, keeps calling load more.
        type:CHANNEL_HOLD_ON
    })

    let url = new URL('http://127.0.0.1:8000/api1/posts/' + channelId)
    url.search = new URLSearchParams({'checkpoint': getState().channel.checkpoint}).toString()
    fetch(url, {
        headers: {
            'Authorization': getState().auth.authorization
        }
    }).then(resp => {
        if (resp.ok) {
            resp.json().then(json => {
                dispatch({
                    type: APPEND_CHANNEL_POSTS,
                    payload: json
                })
            })
        }
    });
};

export const clearChannels = () => (dispatch,getState) => {
    dispatch({
        type: CLEAR_CHANNEL_POSTS
    })
}