const initState = {
    channels:[
        {name:'sports',logo:'https://b.thumbs.redditmedia.com/fI7UdJ-vgpnLdxy28QdKIYBGg-fEo7KxQ_PS7pn4QzM.png'},
        {name:'sports',logo:'https://b.thumbs.redditmedia.com/fI7UdJ-vgpnLdxy28QdKIYBGg-fEo7KxQ_PS7pn4QzM.png'},
        {name:'sports',logo:'https://b.thumbs.redditmedia.com/fI7UdJ-vgpnLdxy28QdKIYBGg-fEo7KxQ_PS7pn4QzM.png'},
    ]
};

const navbarReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'ADD CHANNELS':
        //     return {
        //         ...state,
        //         channels: [...state.channels,...action.payload]
        //     };
        default:
            return state
    }
};

export default navbarReducer