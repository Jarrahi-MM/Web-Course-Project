import React, {Component} from 'react';


class Post extends Component {
    constructor(probs) {
        super(probs);
        this.state = {postId: probs.postId}
    }

    render() {
        return (
            <div style={{width: '200px', height: '200px', backgroundColor: 'red'}}>
                Post {this.state.postId}
            </div>
        );
    }
}

export default Post;
