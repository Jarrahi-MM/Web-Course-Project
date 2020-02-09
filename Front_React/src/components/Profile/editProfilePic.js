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

        let fd = new FormData()
        fd.append('profilePic', event.target.files[0], this.props.username)
        let url = new URL('https://59788.cke-cs.com/token/dev/D4EUlj4fwrGlaxEwLwLqfkedrU6RZwlwhF0b1NhgtydQPokOdVxaa2FFAEz0')
        fetch(url).then((resp) => resp.json).then((token) => {
            let url = new URL('https://59788.cke-cs.com/easyimage/upload/')
            fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body: fd
            }).then((resp) => {
                if (!resp.ok) {
                    console.log('error upload error:')
                    console.log(resp)
                } else {
                    resp.json().then((json) => {
                        this.props.saveNewImageUrl(json[2])
                    })
                }
            })
        })
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
                <ProfilePicture image={this.props.imagePreviewUrl}/>
            </div>
        );
    }
}

export default EditProfilePic;
