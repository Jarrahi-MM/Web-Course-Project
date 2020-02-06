import {APPEND_ALERTS, APPEND_CHANNEL_POSTS, APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB} from "./types";
import _ from 'lodash'

const fake_posts = {
    posts: [
        {
            postNumber: 1,
            channel: 2
        },
    ],
    checkpoint: 'some date',
    hasMoreItems: true
};

export const loadMoreChannelPosts = (channelId) => (dispatch, getState) => {
    let url = new URL('http://127.0.0.1:8000/api1/posts/'+channelId)
    url.search = new URLSearchParams({'checkpoint': getState().alerts.checkpoint}).toString()
    fetch(url,{
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