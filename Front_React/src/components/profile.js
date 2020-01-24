import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

const containStyle = {
    position: 'relative',
    top: '10px'
};
const settingsStyle = {
    position: 'relative',
    float:'right',
    top: '10px'
};


const avatars = ['https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1164.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1120.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1154.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1159.jpg',
    'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1148.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1153.jpg'
    , 'https://image.freepik.com/vetores-gratis/avatar-de-cara-de-monstro-dos-desenhos-animados-monstro-do-dia-das-bruxas_6996-1139.jpg'
    , 'https://image.freepik.com/free-vector/three-eyed-monster-face_1639-7241.jpg'
    , 'https://image.freepik.com/free-vector/four-eyed-monster-face_1639-6913.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1115.jpg'];


class Profile extends Component {
    state = {
        proPicture: avatars[Math.floor(Math.random() * avatars.length)],
        followingNumber: 187,
        followerNumber: 234,
        postNumber: 45
    };

    render() {
        return (
            <div style={containStyle}>
                <div className="ui piled raised very padded container segment">
                    <Link to={'/editProfile'} style ={settingsStyle} className="circular ui icon big button">
                        <i className="icon settings big"/>
                    </Link>
                    <ProfilePicture image={this.state.proPicture}/>
                    <ProfileDetails
                        followingNum={this.state.followingNumber}
                        followerNum={this.state.followerNumber}
                        postNum={this.state.postNumber}/>
                    <hr/>
                </div>
            </div>
        );
    }
}

export default Profile;