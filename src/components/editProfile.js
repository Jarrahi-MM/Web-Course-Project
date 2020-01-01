import React, {Component} from "react";
import EditProfilePic from "./editProfilePic";
import ProfileDetails from "./ProfileDetails";

const containStyle = {
    position: 'relative',
    top: '30px'
};

class EditProfile extends Component {

    render() {
        return (
            <React.Fragment>
                <div style={containStyle}>
                    <div className="ui piled raised very padded container segment">
                        <EditProfilePic/>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default EditProfile;
