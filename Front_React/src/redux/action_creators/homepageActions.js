import {APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB, NEW_TAB} from "./types";
import _ from 'lodash'

const fake_followed_tab_response = {
    postObjs: [
        {
            postNumber: 1,
            channel: 2
        },
        {
            postNumber: 2,
            channel: 3
        },
        {
            postNumber: 3,
            channel: 23
        },
        {
            postNumber: 4,
            channel: 123
        },
        {
            postNumber: 5,
            channel: 233
        },
    ],
    checkpoint: 'a date maybe',
    hasMoreItems: true
};

const fake_hottest_tab_response = {
    postIds: [
        {
            id: 6,
        },
        {
            id: 7,
        },
        {
            id: 8,
        },
        {
            id: 9,
        },
        {
            id: 10,
        },
    ],
    checkpoint: 'a date maybe',
    hasMoreItems: false
};

const fake_other_tabs_response = {
    postIds: [],
    checkpoint: 'a date maybe',
    hasMoreItems: false
};


export const loadMoreItems = () => (dispatch, getState) => {
    let tab_name = getState().homepage.activeTab.split(' ')[0]
    let url = new URL('http://127.0.0.1:8000/api1/homepage/' + tab_name)
    url.search = new URLSearchParams({'checkpoint': getState().homepage.checkpoint}).toString()
    fetch(url, {
        headers: {
            'Authorization': getState().auth.authorization
        }
    }).then(resp => {
        if (resp.ok) {
            resp.json().then(function (json) {
                dispatch({
                    type: APPEND_POSTS,
                    payload: json
                })
            })
        }
    })
    // switch (getState().homepage.activeTab) {
    //     case FOLLOWED_TAB:
    //         setTimeout(()=>{
    //             dispatch({
    //                 type: APPEND_POSTS,
    //                 payload: _.cloneDeep(fake_followed_tab_response)
    //             });
    //             fake_followed_tab_response.postObjs.forEach((obj)=> obj.postNumber+=5)
    //         },500);
    //         break;
    //     case HOTTEST_TAB:
    //         dispatch({
    //             type: APPEND_POSTS,
    //             payload: fake_hottest_tab_response
    //         });
    //         break;
    //     default:
    //         dispatch({
    //             type: APPEND_POSTS,
    //             payload: fake_other_tabs_response
    //         });
    //         break;
    // }
};

export const setActiveTab = (tab) => (dispatch, getState) => {
    dispatch({
        type: NEW_TAB,
        payload: tab
    })
};