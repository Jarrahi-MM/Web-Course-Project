import React, {Component} from 'react';
import {Comment} from 'semantic-ui-react'
import './Post.css'

function processComment(props, comment) {
    if (!comment.id.startsWith(props.startingId))
        return null;
    if (comment.id === props.startingId)
        return null;
    let extractedId = comment.id.replace(props.startingId, '');
    return (!extractedId.includes('.')) ?
        <React.Fragment>
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                <Comment.Content>
                    <Comment.Author as='a'>{comment.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                <Comments comments={props.comments} startingId={comment.id + '.'}/>
            </Comment>
        </React.Fragment> :
        null;
}

function Comments(props) {
    return (
        <Comment.Group>
            {props.comments.map(comment => processComment(props, comment))}
        </Comment.Group>
    )
}


class Post extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            postId: probs.postId,
            username: '',
            time: '',
            picURL: '',
            video: '',
            text: '',
            comments: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({username: "Writer Username"});
        this.setState({time: "Post Time"});
        this.setState({picURL: "https://www.google.com/search?safe=strict&sxsrf=ACYBGNTLD7yk7UA0uEnWw51jzX5SFGVmVQ:1577901896679&q=New+Year%27s+Day&oi=ddle&ct=144862468&hl=en&sa=X&ved=0ahUKEwikvajQ_uLmAhWl0KYKHa9FCM0QPQgO"});
        this.setState({video: "null"});
        this.setState({text: "Text"});
        let comments = [];
        comments.push({username: 'username 1', id: '.1', text: 'comment 1'});
        comments.push({username: 'username 2', id: '.2', text: 'comment 2'});
        comments.push({username: 'username 1.2.1', id: '.1.2.1', text: 'comment 1-2-1'});
        comments.push({username: 'username 1.2', id: '.1.2', text: 'comment 1-2'});
        comments.push({username: 'username 1.1', id: '.1.1', text: 'comment 1-1'});
        this.setState({comments: comments});
        fetch(`http://localhost:8000/test/post/${this.state.postId}`, {
            method: 'GET',
            headers: {
                //Auth
            }
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.message);
                this.setState({username: resp.message});
            })
            .catch(e => console.log(e))
    }

    render() {
        let containerWidth = Math.min(window.innerWidth, window.innerHeight);
        let horizontalMargin = (window.innerWidth - containerWidth) / 2;
        return (
            <div id='postContainer' style={{
                width: containerWidth,
                left: horizontalMargin
            }}>
                <h3>
                    PostId: {this.state.postId}
                </h3>
                <h4>
                    Username: {this.state.username}
                </h4>
                {/*<CommentExampleComment/>*/}
                <Comments comments={this.state.comments} startingId='.'/>
            </div>
        );
    }
}

export default Post;
