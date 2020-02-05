import React, {Component} from "react";
import EditProfilePic from "./editProfilePic";
import EditUserProfileForm from "./editUserProfileForm";
import EditChannel from "../channel/editChannel";
import {withCookies} from "react-cookie";
import ChangePassword from "./changePassword";

const containStyle = {
    position: 'relative',
    top: '30px'
};

const contain2Style = {
    position: 'relative',
    top: '30px',
    bottom: '30px',
    marginBottom: '50px'
};

class EditProfile extends Component {

    state = {
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        profile: {
            user: [],
            city: "",
            country: "",
            phoneNum: ""
        },
        channel: {},
        pressed: false,
        isNotChannel: true,
    };

    componentDidMount() {
        if (this.state.token) {
            fetch(`http://127.0.0.1:8000/api1/profiles/${this.state.username}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(response => response.json())
                .then(res => {
                    this.setState({profile: res});
                })
                .catch(error => console.log(error));
            fetch(`http://127.0.0.1:8000/api1/channels/${this.state.username}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(response => response.json())
                .then(res => {
                    this.setState({channel: res})
                }).then(re => {
                if (this.state.username !== this.props.username) {
                    this.setState({isNotChannel: false})
                }
            })
                .catch(error => console.log(error))

        } else {
            window.location.href = '/'
        }

    }

    togglePressed = () => {
        this.setState({pressed: !this.state.pressed})
    };


    render() {
        return (
            <React.Fragment>
                <div style={containStyle}>
                    <div className="ui piled raised very padded container segment">
                        {this.state.isNotChannel ?
                            (<div>
                                <h4 className="ui dividing header">Personal Information</h4>
                                <EditProfilePic/>
                                <div className="ui vertical labeled icon buttons" style={contain2Style}>
                                    <button className="ui button" onClick={this.togglePressed}>
                                        <i className="settings icon"/>
                                        {this.state.pressed ?
                                            <span>change password</span> :
                                            <span>change profile information</span>
                                        }
                                    </button>
                                </div>
                                {this.state.pressed ?
                                    <EditUserProfileForm profileInfo={this.state.profile}
                                                         token={this.state.token}
                                                         username={this.state.username}
                                                         channelInfo={this.state.channel}/> :
                                    <ChangePassword/>
                                }
                            </div>) :
                            <EditChannel/>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default withCookies(EditProfile);
