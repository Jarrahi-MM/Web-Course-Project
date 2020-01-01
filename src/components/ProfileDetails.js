import React, {Component} from "react";
import {Link} from "react-router-dom";

const containStyle = {
    position: 'relative',
    top: '70px'
};

class ProfileDetails extends Component {
    render() {
        return (<React.Fragment style={containStyle}>
                <div className="ui labeled button huge" tabIndex="0">
                    <div className="ui  button ">
                        <i className="archive icon big"/> Posts
                    </div>
                    <Link className="ui basic blue left pointing label">
                        {this.props.postNum}
                    </Link>
                </div>
                <div className="ui labeled button huge" tabIndex="0">
                    <div className="ui  button">
                        <i className="users circle icon big"/> Followers
                    </div>
                    <Link className="ui basic blue left pointing label">
                        {this.props.followerNum}
                    </Link>
                </div>
                <div className="ui labeled button huge" tabIndex="0">
                    <div className="ui button">
                        <i className="users icon big"/> Followings
                    </div>
                    <Link className="ui basic blue left pointing label">
                        {this.props.followingNum}
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default ProfileDetails;
