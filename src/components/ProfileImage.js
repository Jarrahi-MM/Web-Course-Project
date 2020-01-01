import React, {Component} from 'react';

import ImageExampleCircular from "./ImageExampleCircular";

const containStyle = {
    width: '250px',
};

const avatars = ['https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1164.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1120.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1154.jpg'
    , 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1159.jpg',
    'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1148.jpg']

class ProfileImage extends Component {

    state = {
        selectedFile: null,
        imagePreviewUrl: avatars[Math.floor(Math.random() * avatars.length)]
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
                <div className="input-group" >
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
                <ImageExampleCircular image={this.state.imagePreviewUrl}/>
            </div>
        );
    }
}

export default ProfileImage;
