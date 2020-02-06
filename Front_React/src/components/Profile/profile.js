import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";
import './profile.css'
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {openModal} from "../../redux/action_creators/modalActions";
import {Loader} from "semantic-ui-react";
import nextId from "react-id-generator";
import InfiniteScroll from "react-infinite-scroller";
import PostCard from "../posts/PostCard";
import {loadMoreChannelPosts} from "../../redux/action_creators/channelActions";


const avatars = ['https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1164.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1120.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1154.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1159.jpg',
    'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1148.jpg'
    , 'https://image.freepik.com/vetores-gratis/avatar-de-cara-de-monstro-dos-desenhos-animados-monstro-do-dia-das-bruxas_6996-1139.jpg'
    , 'https://image.freepik.com/free-vector/four-eyed-monster-face_1639-6913.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1115.jpg'];


class Profile extends Component {

    state = {
        userInfo: [],
        proPicture: avatars[Math.floor(Math.random() * avatars.length)],
        myAccount: false,
        following: true,
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        channels: []
    };

    followClicked = followed => {
        this.setState({following: followed});
        console.log(this.state.token);
        console.log(this.state.username)
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/channel/${this.props.username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({userInfo: res})
            })
            .catch(error => console.log(error));

        fetch(`http://127.0.0.1:8000/api1/channel/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({channels: res});
                for (let r in res) {
                    if (res[r].channelId === this.props.username)
                        this.setState({myAccount: true});
                }
            })
            .catch(error => console.log(error));

    }

    createPostClicked = () => {
        this.props.openModal(
            'post_create',
            {channelId: null}
        )
    }


    render() {
        return (
            <div className="containStyle">
                <div className="ui piled raised very padded container segment">
                    {this.state.myAccount ? (<div>
                            <Link to={`/editProfile/${this.props.username}`}
                                  className="circular ui icon big button settingsStyle">
                                <i className="icon settings big"/>
                            </Link>
                            <div onClick={this.createPostClicked} className="circular ui icon big button settingsStyle">
                                <i className="icon plus big"/>
                            </div>
                            <Link to={'/channel'} className="circular ui icon big button settingsStyle">
                                <i className="icon bullhorn big"/>
                            </Link>
                        </div>) :
                        (
                            <div>
                                {this.state.following ?
                                    <button className="ui active button big green followStyle"
                                            onClick={() => this.followClicked(false)}>
                                        <i className="user icon green"/>
                                        Following
                                    </button>
                                    : <button className="ui active button big followStyle"
                                              onClick={() => this.followClicked(true)}>
                                        <i className="user icon "/>
                                        Follow
                                    </button>}
                            </div>
                        )}
                    <ProfilePicture image={this.state.proPicture}/>
                    <ProfileDetails
                        followingNum={this.state.userInfo.followingsNum}
                        followerNum={this.state.userInfo.followersNum}
                        postNum={this.state.userInfo.postsNum}
                        username={this.props.username}
                    />
                    <hr/>
                    <h3>{this.state.userInfo.description}</h3>
                    <hr/>
                    <div>
                        <InfiniteScroll
                            loadMore={() => this.loadMore()}
                            hasMore={this.props.hasMoreItems}
                            loader={this.getLoaderComponent()}>

                            {this.props.posts.map(post => {
                                return (
                                    <PostCard channelId={post.channel} postNumber={post.postNumber} key={nextId()}/>
                                )
                            })}

                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }

    loadMore() {
        this.props.loadMoreChannelPosts(/*this.props.channelId*/'jarrahi1')
    }

    getLoaderComponent() {
        return (
            <Loader key={-1} active inline={"centered"}/>
        )
    }
}

const mapStateToProps = (state) => ({
    hasMoreItems: state.channel.hasMoreItems,
    posts: state.channel.posts
})

export default connect(mapStateToProps, {openModal,loadMoreChannelPosts})(withCookies(Profile));
