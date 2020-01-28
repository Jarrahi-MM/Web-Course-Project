import {APPEND_ALERTS, APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB} from "./types";
import _ from 'lodash'

const fake_alerts = {
    alerts: [
        {
            type: 'follow',
            imageURL: 'https://secure.gravatar.com/avatar/fa2406d243a61b7eb3cd7a8f951325f0.jpg?s=300&d=retro&r=g',
            byUsername: 'satushi',
            date: '2020-01-27 16:35:25.273695',
            // commentId: null, //linking to comments are not implemented by jarrahi.
            postId: null,
            postTitle: null,
            comment: null,
        },
        {
            type: 'comment',
            imageURL: 'https://quera.ir/media/CACHE/images/public/avatars/c6e35a34b4d14613a37de6b34fd676c4/541f254d3c0e4e4d94046772bceb8aea.jpg',
            byUsername: 'rima',
            date: '2020-01-27 16:35:25.273695',
            // commentId: 7, //linking to comments are not implemented by jarrahi.
            postId: 12,
            postTitle: 'cute cat video',
            comment: 'aww',
        },
    ],
    checkpoint: 'some date',
    hasMoreItems: true
}

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