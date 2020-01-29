import React, {Component} from "react";
import EditProfilePic from "./editProfilePic";
import EditUserProfileForm from "./editUserProfileForm";
import EditChannelInfo from "./editChannelInfo";

const containStyle = {
    position: 'relative',
    top: '30px'
};

class EditProfile extends Component {

    state = {
        isChannel: true,
    };

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
                        <h4 className="ui dividing header">Personal Information</h4>
                        <EditProfilePic/>
                        {this.state.isChannel ?
                            <EditUserProfileForm/> :
                            <EditChannelInfo/>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default EditProfile;
