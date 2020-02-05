import React, {Component} from 'react';
import {Comment} from 'semantic-ui-react'
import './Post.css'
import InfiniteScroll from 'react-infinite-scroll-component';

// function processComment(props, comment) {
//     if (!comment.id.startsWith(props.startingId))
//         return null;
//     if (comment.id === props.startingId)
//         return null;
//     let extractedId = comment.id.replace(props.startingId, '');
//     return (!extractedId.includes('.')) ?
//         <React.Fragment>
//             <Comment>
//                 <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
//                 <Comment.Content>
//                     <Comment.Author as='a'>{comment.username}</Comment.Author>
//                     <Comment.Metadata>
//                         <div>Today at 5:42PM</div>
//                     </Comment.Metadata>
//                     <Comment.Text>{comment.text}</Comment.Text>
//                     <Comment.Actions>
//                         <Comment.Action>Reply</Comment.Action>
//                     </Comment.Actions>
//                 </Comment.Content>
//                 <Comments comments={props.comments} startingId={comment.id + '.'}/>
//             </Comment>
//         </React.Fragment> :
//         null;
// }

// function Comments(props) {
//     return (
//         <Comment.Group>
//             {props.comments.map(comment => processComment(props, comment))}
//         </Comment.Group>
//     )
// }


class Post extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            myusername: probs.username,
            token: probs.token,
            channelId: probs.channelId,
            postNum: probs.postNum,
            postTitle: '',
            creator: '',
            creationDate: '',
            likesNum: '',
            image: '',
            text: '',
            firstCommentId : '',
        };
    }

    componentDidMount() {
        this.getPostData();
    }

    getPostData() {
        fetch(`http://127.0.0.1:8000/api1/posts/${this.state.channelId}/${this.state.postNum}/`, {
            method: 'GET',
            headers: {
                'Authorization': this.state.token,
            },
        })
            .then(resp => resp.json())
            .then(resp => {
                this.setState({postTitle: resp.postTitle});
                this.setState({creator: resp.creator});
                this.setState({creationDate: resp.creationDate});
                this.setState({firstCommentId: resp.firstComment});
                this.setState({likesNum: resp.likesNum});
                this.setState({image: resp.image});
                this.setState({text: resp.text});
                // let comments = [];
                // comments.push({username: 'username 1', id: '.1', text: 'comment 1'});
                // comments.push({username: 'username 2', id: '.2', text: 'comment 2'});
                // comments.push({username: 'username 1.2.1', id: '.1.2.1', text: 'comment 1-2-1'});
                // comments.push({username: 'username 1.2', id: '.1.2', text: 'comment 1-2'});
                // comments.push({username: 'username 1.1', id: '.1.1', text: 'comment 1-1'});
                // this.setState({comments: comments});
            })
            .catch(e => console.log(e))
    }

    render() {
        let containerWidth = Math.min(window.innerWidth, window.innerHeight);
        let horizontalMargin = (window.innerWidth - containerWidth) / 2;
        return (
            <div id='postContainer' style={{width: containerWidth, left: horizontalMargin}}>
                <div>
                    <img src="https://www.google.com/images/hpp/shield_privacy_checkup_green_2x_web_96dp.png"
                         className="ui avatar image"
                    />
                    <h3>{this.state.postTitle}</h3>
                    <h4>{this.state.creator.username}</h4>
                </div>
                <div className="ui justified container">
                    <b>Image:</b>
                    <div className="ui divider"></div>
                    <img src={this.state.image}/>
                </div>
                <div className="ui justified container">
                    <b>Text:</b>
                    <div className="ui divider"></div>
                    <p>
                        {this.state.text}
                    </p>
                </div>

                {/*<InfiniteScroll*/}
                {/*    dataLength={items.length} //This is important field to render the next data*/}
                {/*    next={fetchData}*/}
                {/*    hasMore={true}*/}
                {/*    loader={<h4>Loading...</h4>}*/}
                {/*    endMessage={*/}
                {/*        <p style={{textAlign: 'center'}}>*/}
                {/*            <b>Yay! You have seen it all</b>*/}
                {/*        </p>*/}
                {/*    }*/}
                {/*    // below props only if you need pull down functionality*/}
                {/*    refreshFunction={this.refresh}*/}
                {/*    pullDownToRefresh*/}
                {/*    pullDownToRefreshContent={*/}
                {/*        <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>*/}
                {/*    }*/}
                {/*    releaseToRefreshContent={*/}
                {/*        <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>*/}
                {/*    }>*/}
                {/*    {items}*/}
                {/*</InfiniteScroll>*/}


                {/*<CommentExampleComment/>*/}
                {/*<Comments comments={this.state.comments} startingId='.'/>*/}
            </div>
        );
    }
}

export default Post;
