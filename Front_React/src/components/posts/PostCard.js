import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostBody from "./PostBody";
import {loadPost} from "../../redux/action_creators/postActions";
import {Loader, Button, Icon, Popup} from "semantic-ui-react";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import TimeAgo from "react-timeago/lib";
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {openModal} from "../../redux/action_creators/modalActions";

class PostCard extends Component {
    //props:
    //channelId
    //postNumber
    state = {
        copiedToClipboard: false,
    }

    constructor(props) {
        super(props)
        props.loadPost(this.props.channelId, this.props.postNumber)
    }

    shareOnClick = () => {
        this.setState({copiedToClipboard: true})
        setTimeout(() => this.setState({copiedToClipboard: false}), 2000)
    }

    onLike = () => {
        console.log(this.props.token);
        // return ((evt) => {
        //     fetch('http://127.0.0.1:8000/api1/postLikes/', {
        //         method: 'PUT',
        //         headers: {
        //             'Authorization': this.props.token,
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({channelId: this.props.channelId, postNumber, this.props.postNumber, value: '1'})
        //     })
        //         .then(resp => resp.json())
        //         .then(resp => {
        //             this.updateComment(resp);
        //         })
        //         .catch(e => console.log(e))
        // });
    }

    onDislike = () => {

    }

    onComment = () => {
this.props.openModal('comment_create',{supCommentId:this.props.post.firstComment})
    }

    onEdit = () => {
        this.props.openModal('post_edit',{channelId:this.props.channelId,postId:this.props.postNumber})
    }

    render() {
        let {post, username} = this.props
        if (post) {
            return (
                <div>
                    <div className={'shadow rounded mb-5 container border p-3 overflow-hidden'}>
                        <Link to={`/post/${post.channel}/${post.postNumber}`}><h3
                            className={'my-2'}>{post.postTitle}</h3>
                        </Link>
                        posted by <Link to={`/profile/${post.creator.username}`}>{post.creator.username}</Link>
                        <small className={'text-secondary ml-2'}><TimeAgo date={post.creationDate}/></small>
                        <Divider/>
                        <PostBody text={post.text}/>
                        <Divider/>
                        <div className={'d-flex justify-content-around'}>
                            <Popup
                                trigger={
                                    <CopyToClipboard
                                        text={`${window.location.host}/post/${post.channel}/${post.postNumber}`}>
                                        <Button basic icon onClick={this.shareOnClick}>
                                            <Icon name={'share'}/>
                                        </Button>
                                    </CopyToClipboard>
                                }
                                content={this.state.copiedToClipboard ? "Link copied to clipboard" : "Copy link to clipboard"}
                                basic
                            />
                            <Button.Group size={"tiny"}>
                                <Button onClick={this.onDislike} size={"tiny"} basic color={"orange"}><Icon
                                    name={'thumbs down'} fitted/></Button>
                                <Button.Or text={post.likesNum}/>
                                <Button onClick={this.onLike} size={"tiny"} basic color={"blue"}><Icon
                                    name={'thumbs up'} fitted/></Button>
                            </Button.Group>
                            <Button onClick={this.onComment} basic animated='vertical'>
                                <Button.Content visible><Icon name={'comment outline'}/></Button.Content>
                                <Button.Content hidden><small>Comment</small></Button.Content>
                            </Button>
                            {
                                username == post.creator.username ?
                                    <Button onClick={this.onEdit} basic animated='vertical'>
                                        <Button.Content visible><Icon name={'edit outline'}/></Button.Content>
                                        <Button.Content hidden><small>Edit</small></Button.Content>
                                    </Button>
                                    :
                                    []
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Loader/>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts.posts[[ownProps.channelId, ownProps.postNumber]],
        username: state.auth.username,
        token: state.auth.authorization,
    };
}

export default connect(mapStateToProps, {loadPost, openModal})(PostCard);