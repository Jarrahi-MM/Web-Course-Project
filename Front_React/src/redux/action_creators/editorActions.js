//editorstate:
//action: comment_create, post_create, comment_edit, post_edit
//address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
//data: the text to post

export const saveData = (editorState) => (dispatch, getState) => {
    switch (editorState.action) {
        case 'comment_create':
            fetch('http://127.0.0.1:8000/api1/comments/', {
                method: 'POST',
                headers: {
                    'Authorization': getState().auth.authorization,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fatherId: editorState.address.supCommentId,
                    text: editorState.data.toString(),
                })
            }).then((resp) => {
                console.log('Created Comment:' + resp);
            });
            break
        case 'post_create':
            fetch(`http://127.0.0.1:8000/api1/post/${editorState.address.channelId}`, {
                method: 'POST',
                headers: {
                    'Authorization': getState().auth.authorization,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: '',
                    text: editorState.data.toString(),
                    postTitle: editorState.post_create_title
                })
            }).then((resp) => {
                console.log('Created Post:' + resp);
            });
            break
        case 'comment_edit':
            fetch('http://127.0.0.1:8000/api1/comments/', {
                method: 'PUT',
                headers: {
                    'Authorization': getState().auth.authorization,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editorState.address.commentId,
                    text: editorState.data.toString(),
                })
            }).then((resp) => {
                console.log('Editted Comment:' + resp);
            });
            break
        case 'post_edit':
            fetch(`http://127.0.0.1:8000/api1/post/${editorState.address.channelId}/${editorState.address.postId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': getState().auth.authorization,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: '',
                    text: editorState.data.toString(),
                    postTitle: editorState.post_create_title
                })
            }).then((resp) => {
                console.log('Edited Post:' + resp);
            });
            break
    }
}


//editorstate:
//action: comment_edit, post_edit
//address: {commentId}, {channelId,postId}
export const delete_item = (editorState) => (dispatch,getState) => {
    switch (editorState.action) {
        case 'comment_edit':
            break //todo jarrahi
        case 'post_edit':
            break

    }
}