import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withCookies} from "react-cookie";


class ProfileDetails extends Component {

    state = {
        username: this.props.cookies.get('userName'),
    };

    render() {
        return (<React.Fragment>
                <Link className="ui labeled button huge" tabIndex="0" to={`/profile/${this.state.username}`}>
                    <div className="ui  button ">
                        <i className="archive icon big"/> Posts
                    </div>
                    <div className="ui basic blue left pointing label">
                        {this.props.postNum}
                    </div>
                </Link>
                <Link className="ui labeled button huge" tabIndex="0" to={`/followersList/${this.props.username}`}>
                    <div className="ui  button">
                        <i className="users circle icon big"/> Followers
                    </div>
                    <div className="ui basic blue left pointing label">
                        {this.props.followerNum}
                    </div>
                </Link>
                {this.props.isPersonal ?
                    <Link className="ui labeled button huge" tabIndex="0" to={`/followingsList/${this.props.username}`}>
                        <div className="ui button">
                            <i className="users icon big"/> Followings
                        </div>
                        <div className="ui basic blue left pointing label">
                            {this.props.followingNum}
                        </div>
                    </Link> :
                    <span/>}
            </React.Fragment>
        );
    }
}

export default withCookies(ProfileDetails);
