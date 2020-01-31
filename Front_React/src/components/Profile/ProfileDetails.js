import React, {Component} from "react";
import {Link} from "react-router-dom";


class ProfileDetails extends Component {
    render() {
        return (<React.Fragment>
                <Link className="ui labeled button huge" tabIndex="0" to={'/profile'}>
                    <div className="ui  button ">
                        <i className="archive icon big"/> Posts
                    </div>
                    <div className="ui basic blue left pointing label">
                        {this.props.postNum}
                    </div>
                </Link>
                <Link className="ui labeled button huge" tabIndex="0" to={'/followList'}>
                    <div className="ui  button">
                        <i className="users circle icon big"/> Followers
                    </div>
                    <div className="ui basic blue left pointing label">
                        {this.props.followerNum}
                    </div>
                </Link>
                <Link className="ui labeled button huge" tabIndex="0" to={'/followList'}>
                    <div className="ui button">
                        <i className="users icon big"/> Followings
                    </div>
                    <div className="ui basic blue left pointing label">
                        {this.props.followingNum}
                    </div>
                </Link>
            </React.Fragment>
        );
    }
}

export default ProfileDetails;
