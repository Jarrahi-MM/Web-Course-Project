import React, {Component} from 'react';

import ProfilePicture from "./ProfilePicture";

const containStyle = {
    width: '250px',
};

class EditProfilePic extends Component {
    //props:
    //imagePreviewUrl
    //saveNewImageUrl()
    //username

    state = {
        selectedFile: null,
        imagePreviewUrl: 'https://image.freepik.com/free-vector/cartoon-monster-face-avatar-halloween-monster_6996-1156.jpg'
    };

    fileChangedHandler = event => {
        // this.setState({
        //     selectedFile: event.target.files[0]
        // });
        //
        // let reader = new FileReader();
        //
        // reader.onloadend = () => {
        //     this.setState({
        //         imagePreviewUrl: reader.result
        //     });
        // };
        //
        // reader.readAsDataURL(event.target.files[0])

        let url = new URL('https://59788.cke-cs.com/easyimage/upload/')
        let fd = new FormData()
        fd.append('profilePic',event.target.files[0],'')
    };

    render() {
        return (
            <div style={containStyle}>
                <div className="input-group mb-4">
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
