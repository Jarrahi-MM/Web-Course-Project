import {APPEND_ALERTS, APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB} from "./types";
import _ from 'lodash'

const fake_alerts = {
    alerts: [
        {
            is_comment: true,
            by_user: {
                username: 'satushi'
            },
            creation_date: '2020-01-27 16:35:25.273695',
            // commentId: null, //linking to comments are not implemented by jarrahi.
            post : {
                channel: null,
                postNumber: null,
                postTitle: 'titlelsajdf;la',
            },
            comment: {
                text: 'sth'
            },
            has_been_seen: null
        },
        // {
        //     isComment: true,
        //     by_user: 'rima',
        //     date: '2020-01-27 16:35:25.273695',
        //     // commentId: 7, //linking to comments are not implemented by jarrahi.
        //     postChannelId: 8,
        //     postId: 12,
        //     postTitle: 'cute cat video',
        //     comment: 'aww',
        // },
    ],
    checkpoint: 'some date',
    hasMoreItems: true
};

export const loadMoreAlerts = () => (dispatch, getState) => {
    let url = new URL('http://127.0.0.1:8000/api1/alerts/all')
    url.search = new URLSearchParams({'checkpoint': getState().alerts.checkpoint}).toString()
    fetch(url,{
        headers: {
            'Authorization': getState().auth.authorization
        }
    }).then(resp => {
        if (resp.ok) {
            resp.json().then(json => {
                dispatch({
                    type: APPEND_ALERTS,
                    payload: json
                })
            })
        }
    });
    // setTimeout(() => {
    //     dispatch({
    //         type: APPEND_ALERTS,
    //         payload: _.cloneDeep(fake_alerts)
    //     });
    // }, 500);
};