//editorstate:
//action: comment_create, post_create, comment_edit, post_edit
//address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
//data: the text to post

export const saveData = (editorState) => (dispatch, getState) => {
    console.log(editorState.data)
    switch (editorState.action) {
        case 'comment_create':
            let url = new URL('http://localhost:8000/api1/comments/')
            fetch(url, {
                method:'post',
                mode:"cors",
                headers: {
                    'Authorization': getState().auth.authorization,
                    'Content-Type': 'application/json',
                    'Host':'localhost:8000'
                },
                body: {
                    fatherId:editorState.address.supCommentId,
                    text: editorState.data.toString(),
                }
            }).then((resp) => {
                if (!resp.ok) {
                    console.log('comment create error: ')
                    console.log(resp)
                }
            })
            break
        case 'post_create':
            break
        case 'comment_edit':
            break
        case 'post_edit':
            break
    }
}