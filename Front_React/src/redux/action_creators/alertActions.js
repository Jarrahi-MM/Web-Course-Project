import {APPEND_ALERTS, APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB} from "./types";
import _ from 'lodash'

const fake_alerts = {
    alerts: [
        {
            type: 'follow',
            byUsername: 'satushi',
            date: '2020-01-27 16:35:25.273695',
            // commentId: null, //linking to comments are not implemented by jarrahi.
            postChannelId: null,
            postId: null,
            postTitle: null,
            comment: null,
        },
        {
            type: 'comment',
            byUsername: 'rima',
            date: '2020-01-27 16:35:25.273695',
            // commentId: 7, //linking to comments are not implemented by jarrahi.
            postChannelId: 8,
            postId: 12,
            postTitle: 'cute cat video',
            comment: 'aww',
        },
    ],
    checkpoint: 'some date',
    hasMoreItems: true
};

export const loadMoreItems = () => (dispatch, getState) => {
    // let url = new URL('http://192.168.1.1:8080/api/alerts/')
    // fetch(url,{body:{checkpoint: getState().alerts.checkpoint}}).then(resp => resp.json()).then(json => {
    //     dispatch({
    //         type: APPEND_ALERTS,
    //         payload: json
    //     })
    // })
    setTimeout(() => {
        dispatch({
            type: APPEND_ALERTS,
            payload: _.cloneDeep(fake_alerts)
        });
    }, 500);
};