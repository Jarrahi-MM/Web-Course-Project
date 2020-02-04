import React, {Component} from "react";
import {withCookies} from "react-cookie";
import EditProfilePic from "../Profile/editProfilePic";

class CreateChannel extends Component {

    state = {
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
    };


    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <EditProfilePic/>
                        <div className="ui form">
                            <div className="three fields">
                                <div className="field">
                                    <label>Channel name</label>
                                    <input type="text" placeholder="channel name"/>
                                </div>
                                <div className="field">
                                    <label>Channel Id</label>
                                    <input type="text" placeholder="channel Id"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default withCookies(CreateChannel)
