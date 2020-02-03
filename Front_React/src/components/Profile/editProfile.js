import React, {Component} from "react";
import EditProfilePic from "./editProfilePic";
import EditUserProfileForm from "./editUserProfileForm";
import EditChannel from "./editChannel";
import {withCookies} from "react-cookie";

const containStyle = {
    position: 'relative',
    top: '30px'
};

const contain2Style = {
    position: 'relative',
    top: '30px',
    bottom: '30px',
    marginBottom:'50px'
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
                                <div className="ui vertical labeled icon buttons" style={contain2Style}>
                                    <button className="ui button" onClick={this.togglePressed}>
                                        <i className="settings icon"/>
                                        view profile details
                                    </button>
                                </div>
                                {this.state.pressed ?
                                    <EditUserProfileForm profileInfo={this.state.profile}
                                                         token={this.state.token}
                                                         username={this.state.username}/> :
                                    <div>
                                        <div className="ui form">
                                            <div className="field">
                                                <label>Description</label>
                                                <textarea rows="2"
                                                          placeholder="Im 20 years old from aliabad ; no follow back ;too shakh;dar hadde ma nisti awrereee"/>
                                            </div>
                                        </div>
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
