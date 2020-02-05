import React, {Component} from 'react';
import {Comment, Button, Form} from 'semantic-ui-react'
import './Post.css'
import InfiniteScroll from 'react-infinite-scroll-component';

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
            firstCommentId: '',
            comments: [],
        };
    }

    updateComment(comment) {
        let updatedComments = this.state.comments.slice();
        let oldComment = updatedComments.filter(old => (old.id == comment.id))[0];
        oldComment.text = comment.text;
        oldComment.creationDate = comment.creationDate;
        oldComment.subCommentsNum = comment.subCommentsNum;
        oldComment.likesNum = comment.likesNum;
        this.setState({comments: updatedComments});
    }

    componentDidMount() {
        this.getPostData();
    }

    getPostData() {
        fetch(`http://127.0.0.1:8000/api1/posts/${this.state.channelId}/${this.state.postNum}/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Token  ' + this.state.token,
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
                this.loadComments(resp.firstComment, '', 0, 500);
            })
            .catch(e => console.log(e))
    }

    loadComments(fatherId, fatherTreeId, from, to) {
        fetch('http://127.0.0.1:8000/api1/commentread/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token  ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fatherId: fatherId, from: from.toString(), to: to.toString()})
        })
            .then(resp => resp.json())
            .then(resp => {
                let updatedComments = this.state.comments.slice();
                resp.map(comment => {
                    let newComment = {
                        username: comment.creator.username,
                        id: comment.id,
                        treeId: fatherTreeId + '.' + comment.commentNumber,
                        text: comment.text,
                        creationDate: comment.creationDate,
                        subCommentsNum: comment.subCommentsNum,
                        likesNum: comment.likesNum,
                        loadedSubComments: 0
                    };
                    updatedComments.push(newComment);
                });
                this.setState({comments: updatedComments});
            })
            .catch(e => console.log(e))
    }

    likeComment(comment) {
        return ((evt) => {
            fetch('http://127.0.0.1:8000/api1/commentLikes/', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Token  ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({commentId: comment.id, value: '1'})
            })
                .then(resp => resp.json())
                .then(resp => {
                    this.updateComment(resp);
                })
                .catch(e => console.log(e))
        });
    }

    unLikeComment(comment) {
        return ((evt) => {
            fetch('http://127.0.0.1:8000/api1/commentLikes/', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Token  ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({commentId: comment.id, value: '0'})
            })
                .then(resp => resp.json())
                .then(resp => {
                    this.updateComment(resp);
                })
                .catch(e => console.log(e))
        });
    }

    disLikeComment(comment) {
        return ((evt) => {
            fetch('http://127.0.0.1:8000/api1/commentLikes/', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Token  ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({commentId: comment.id, value: '2'})
            })
                .then(resp => resp.json())
                .then(resp => {
                    this.updateComment(resp);
                })
                .catch(e => console.log(e))
        });
    }

    replyComment(comment) {
        return ((evt) => {
            console.log("liked " + comment.id);
        });
    }

    loadSubComments(comment) {
        return ((evt) => {
            let loaded = comment.loadedSubComments;
            let subNum = comment.subCommentsNum;
            if (loaded + 5 < subNum) {
                comment.loadedSubComments += 5;
                this.loadComments(comment.id, comment.treeId, loaded + 1, subNum + 5);
            } else {
                comment.loadedSubComments = comment.subCommentsNum;
                this.loadComments(comment.id, comment.treeId, loaded + 1, subNum);
            }
        });
    }

    processComment(startingId, comment) {
        if (!comment.treeId.startsWith(startingId))
            return null;
        if (comment.treeId === startingId)
            return null;
        let extractedId = comment.treeId.replace(startingId, '');

        return (!extractedId.includes('.')) ?
            <Comment key={comment.id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                <Comment.Content>
                    <Comment.Author as='a'>{comment.username + ' ID:' + comment.id}</Comment.Author>
                    <Comment.Metadata>
                        <div>{'Likes:' + comment.likesNum}</div>
                        <div>{'Date:' + comment.creationDate}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text /*Todo Amir*/}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action id='reply' onClick={this.replyComment(comment)}>Reply</Comment.Action>
                        <Comment.Action id='Like' onClick={this.likeComment(comment)}>Like</Comment.Action>
                        <Comment.Action id='UnLike' onClick={this.unLikeComment(comment)}>UnLike</Comment.Action>
                        <Comment.Action id='DisLike' onClick={this.disLikeComment(comment)}>DisLike</Comment.Action>
                        <Comment.Action id='Load'
                                        onClick={this.loadSubComments(comment)}>Load</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                <Comment.Group>
                    {this.state.comments.map(com => this.processComment(comment.treeId + '.', com))}
                </Comment.Group>
            </Comment> :
            null;
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

                <Comment.Group>
                    {this.state.comments.map(comment => this.processComment('.', comment))}
                </Comment.Group>

            </div>
        );
    }
}

export default Post;
