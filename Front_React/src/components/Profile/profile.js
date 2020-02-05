import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";
import './profile.css'
import {withCookies} from "react-cookie";


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
        myAccount: true,
        following: true,
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName')
    };

    followClicked = followed => {
        this.setState({following: followed});
        console.log(this.state.token);
        console.log(this.state.username)
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/channels/${this.props.username}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({userInfo: res})
            })
            .catch(error => console.log(error))

        if (this.state.username === this.props.username)
            this.setState({myAccount: true});
        else
            this.setState({myAccount: false})
    }


    render() {
        return (
            <div className="containStyle">
                <div className="ui piled raised very padded container segment">
                    {this.state.myAccount ? (<div>
                            <Link to={'/editProfile'} className="circular ui icon big button settingsStyle">
                                <i className="icon settings big"/>
                            </Link>
                            <Link to={'/createPost'} className="circular ui icon big button settingsStyle">
                                <i className="icon plus big"/>
                            </Link>
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
                        postNum={this.state.userInfo.postsNum}/>
                    <hr/>
                    <h3>{this.state.userInfo.description}</h3>
                    <hr/>
                    <h3>posts</h3>
                </div>
            </div>
        );
    }
}

export default withCookies(Profile);
