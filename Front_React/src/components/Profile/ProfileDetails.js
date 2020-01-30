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
                <Link className="ui labeled button huge" tabIndex="0" to={'/followList'}>
                    <div className="ui  button">
                        <i className="users circle icon big"/> Followers
                    </div>
                    <Link className="ui basic blue left pointing label" to={'/followList'}>
                        {this.props.followerNum}
                    </Link>
                </Link>
                <Link className="ui labeled button huge" tabIndex="0" to={'/followList'}>
                    <div className="ui button">
                        <i className="users icon big"/> Followings
                    </div>
                    <Link className="ui basic blue left pointing label" to={'/followList'}>
                        {this.props.followingNum}
                    </Link>
                </Link>
            </React.Fragment>
        );
    }
}

export default ProfileDetails;
