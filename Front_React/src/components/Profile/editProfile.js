import React, {Component} from "react";
import EditProfilePic from "./editProfilePic";
import EditUserProfileForm from "./editUserProfileForm";
import EditChannel from "./editChannel";
import {withCookies} from "react-cookie";

const containStyle = {
    position: 'relative',
    top: '30px'
};

class EditProfile extends Component {

    state = {
        isNotChannel: true,
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        profile: {
            user: [],
            city: "",
            country: "",
            phoneNum: ""
        },
        pressed: false
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
                    this.setState({profile: res})
                    console.log(this.state.profile)
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
                                {this.state.pressed ?
                                    <EditUserProfileForm profileInfo={this.state.profile}
                                                         token={this.state.token}
                                                         username={this.state.username}/> :
                                    <div className="ui vertical labeled icon buttons" style={containStyle}>
                                        <button className="ui button" onMouseEnter={this.togglePressed}>
                                            <i className="settings icon"/>
                                            view profile details
                                        </button>
                                    </div>
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
