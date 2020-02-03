import {SEARCH_LOADING_DONE, SEARCH_LOADING_STARTED, SEARCH_RESULTS} from "./types";

const fakeSearchData = {
    'Users': [
        {
            username : 'amir',
        },
        {
            username : 'hasan',
        },
        {
            username : 'naghi',
        },
    ],
    'Channels': [
        {
            'channelId' : 3,
            'channelName': 'science'
        },
        {
            'channelId' : 5,
            'channelName': 'jokes'
        },
        {
            'channelId' : 1,
            'channelName': 'news'
        },

    ],
    'Posts': [
        {
            'channel': 4,
            'postNumber': 1,
            'postTitle': 'a title'
        },
        {
            'channel': 8,
            'postNumber': 2,
            'postTitle': 'another title'
        },

    ],
};

export const search = (value) => (dispatch, getState) => {
    dispatch({
        'type': SEARCH_LOADING_STARTED
    });

    let url = new URL('http://127.0.0.1:8000/api1/search');
    url.search = new URLSearchParams({'q': value}).toString()
    fetch(url
    ).then(function (resp) {
        return resp.json();
    }).then(function (json) {
        dispatch({
            'type': SEARCH_RESULTS,
            'payload': json,
        })
        dispatch({
            'type': SEARCH_LOADING_DONE,
        })
    });
    // setTimeout(()=>{
    //     dispatch({
    //         'type': SEARCH_RESULTS,
    //         'payload': value !== 'no' ? fakeSearchData : {'Users':[],'Posts':[],'Channels':[]},
    //     });
    //     dispatch({
    //         'type': SEARCH_LOADING_DONE,
    //     })
    // },300)
};