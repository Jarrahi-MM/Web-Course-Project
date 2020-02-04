import React, {Component} from 'react';

import ProfilePicture from "./ProfilePicture";

const containStyle = {
    width: '250px',
};

class EditProfilePic extends Component {

    state = {
        selectedFile: null,
        imagePreviewUrl: 'https://image.freepik.com/free-vector/four-eyed-monster-face_1639-6913.jpg'
    };

    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(event.target.files[0])

    };

    render() {
        return (
            <div style={containStyle}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" name="avatar"
                               onChange={this.fileChangedHandler}
                               aria-describedby="inputGroupFileAddon01"/>
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <ProfilePicture image={this.state.imagePreviewUrl}/>
            </div>
        );
    }
}

export default EditProfilePic;
