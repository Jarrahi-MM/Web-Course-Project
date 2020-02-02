import {SEARCH_LOADING_DONE, SEARCH_LOADING_STARTED, SEARCH_RESULTS} from "./types";

const fakeSearchData = {
    'Users': [
        {
            'name': 'amir'
        },
        {
            'name': 'hasan'
        },
        {
            'name': 'naghi'
        },
    ],
    'Channels': [
        {
            'id' : 3,
            'name': 'science'
        },
        {
            'id' : 5,
            'name': 'jokes'
        },
        {
            'id' : 1,
            'name': 'news'
        },

    ],
    'Posts': [
        {
            'channelId': 4,
            'id': 1,
            'name': 'a title'
        },
        {
            'channelId': 8,
            'id': 2,
            'name': 'another title'
        },

    ],
};

export const search = (value) => (dispatch, getState) => {
    dispatch({
        'type': SEARCH_LOADING_STARTED
    });

    // let url = new URL('http://192.168.1.1:8080');
    // url.searchParams = new URLSearchParams({value}).toString()
    // fetch(url
    // ).then(function (resp) {
    //     return resp.json();
    // }).then(function (json) {
    //     dispatch({
    //         'type': SEARCH_RESULTS,
    //         'payload': json,
    //     })
    //     dispatch({
    //         'type': SEARCH_LOADING_DONE,
    //     })
    // });
    setTimeout(()=>{
        dispatch({
            'type': SEARCH_RESULTS,
            'payload': value !== 'no' ? fakeSearchData : {'Users':[],'Posts':[],'Channels':[]},
        });
        dispatch({
            'type': SEARCH_LOADING_DONE,
        })
    },300)
};