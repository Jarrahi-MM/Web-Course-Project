import {APPEND_POSTS, FOLLOWED_TAB, HOTTEST_TAB, NEW_TAB} from "./types";
import _ from 'lodash'

const fake_followed_tab_response = {
    postIds: [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
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
    // let tab_name = getState.homepage.activeTab.split('_')[0]
    // let url = new URL('http://192.168.1.1:8080/api/tabs/'+tab_name)
    // fetch(url,{body:{checkpoint: getState().homepage.checkpoint}}).then(resp => resp.json()).then(json => {
    //     dispatch({
    //         type: APPEND_POSTS,
    //         payload: json
    //     })
    // })
    switch (getState().homepage.activeTab) {
        case FOLLOWED_TAB:
            setTimeout(()=>{
                dispatch({
                    type: APPEND_POSTS,
                    payload: _.cloneDeep(fake_followed_tab_response)
                });
                fake_followed_tab_response.postIds.forEach((obj)=> obj.id+=5)
            },500);
            break;
        case HOTTEST_TAB:
            dispatch({
                type: APPEND_POSTS,
                payload: fake_hottest_tab_response
            });
            break;
        default:
            dispatch({
                type: APPEND_POSTS,
                payload: fake_other_tabs_response
            });
            break;
    }
};

export const setActiveTab = (tab) => (dispatch, getState) => {
    dispatch({
        type: NEW_TAB,
        payload: tab
    })
};