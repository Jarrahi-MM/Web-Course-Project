import React, {Component} from 'react';
import styled from "styled-components";
import EditProfilePic from "./editProfilePic";
import ProfilePicture from "./ProfilePicture";

const Img = styled.img`
max-width: 20%;
`;


class Profile extends Component {
    state = {
        proPicture: 'https://image.freepik.com/free-vector/three-eyed-monster-face_1639-7241.jpg'
    };

    render() {
        return (
            <div>
                <ProfilePicture image={this.state.proPicture}/>
            </div>
        );
    }
}

export default Profile;
