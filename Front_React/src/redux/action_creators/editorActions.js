//editorstate:
//action: comment_create, post_create, comment_edit, post_edit
//address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
//data: the text to post

export const saveData = (editorState) => (dispatch, getState) => {
    switch (editorState.action) {
        case 'comment_create':
            console.log(getState().auth.authorization + ' ' + editorState.address.supCommentId + ' ' + editorState.data.toString());
            // let url = new URL('http://localhost:8000/api1/comments/')
            // fetch(url, {
            //     method:'post',
            //     mode:"cors",
            //     headers: {
            //         'Authorization': getState().auth.authorization,
            //         'Content-Type': 'application/json',
            //         'Host':'localhost:8000'
            //     },
            //     body: {
            //         fatherId:editorState.address.supCommentId,
            //         text: editorState.data.toString(),
            //     }
            // }).then((resp) => {
            //     if (!resp.ok) {
            //         console.log('comment create error: ')
            //         console.log(resp)
            //     }
            // })
            break
        case 'post_create':
            console.log(getState().auth.authorization + ' ' + editorState.address.channelId + ' ' + editorState.data.toString());
            break
        case 'comment_edit':
            console.log(getState().auth.authorization + ' ' + editorState.address.commentId + ' ' + editorState.data.toString());
            break
        case 'post_edit':
            console.log(getState().auth.authorization + ' ' + editorState.address.channelId + ' ' + editorState.address.postId +
                ' ' + editorState.data.toString());
            break
    }
}