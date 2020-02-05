import React, {Component} from "react";
import EditProfilePic from "../Profile/editProfilePic";
import CreateChannel from "./createChannel";


class EditChannelInfo extends Component {

    render() {
        return (
            <React.Fragment>
                <CreateChannel update={true} channelId={this.props.channelId}/>
            </React.Fragment>
        )
    }

}

export default EditChannelInfo
