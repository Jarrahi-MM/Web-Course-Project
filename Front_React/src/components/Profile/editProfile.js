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
        }
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


    editClicked = selMovie => {
        this.setState({editedMovie: selMovie})
    };

    newMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}})
    };

    addMovie = movie => {
        this.setState({movies: [...this.state.movies, movie]})
    };

    cancelForm = () => {
        this.setState({editedMovie: null})
    };

    movieClicked = movie => {
        this.setState({selectedMovie: movie, editedMovie: null})
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
                                <EditUserProfileForm profileInfo={this.state.profile}
                                                     token={this.state.token}
                                                     username={this.state.username}/>
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
