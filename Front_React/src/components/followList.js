import React, {Component} from "react";
import {withCookies} from "react-cookie";
import {Link} from "react-router-dom";

class FollowList extends Component {

    state = {
        followList: [],
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        follower: this.props.follower,
    };

    removeClicked = thisGuy => {
        let channel = {removeFromFollowers: ''};
        channel['removeFromFollowers'] = thisGuy;
        fetch(`http://127.0.0.1:8000/api1/channel/${this.state.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`
            },
            body: JSON.stringify(channel)
        }).then(response => response.json())
            .then(resp => {
                console.log(channel);
                this.componentDidMount()
            })
            .catch(error => console.log(error))
    };

    blockClicked = thisGuy => {
        let channel = {block: ''};
        channel['block'] = thisGuy;
        fetch(`http://127.0.0.1:8000/api1/channel/${this.state.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`
            },
            body: JSON.stringify(channel)
        }).then(response => response.json())
            .then(resp => {
                console.log(channel);
                this.componentDidMount()
            })
            .catch(error => console.log(error))
    };

    componentDidMount() {
        if (this.state.token) {
            if (this.state.follower) {
                fetch(`http://127.0.0.1:8000/api1/channel/${this.props.username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${this.state.token}`
                    }
                }).then(response => response.json())
                    .then(res => {
                        console.log(res.followers)
                        this.setState({followList: res.followers})
                    })
                    .catch(error => console.log(error))
            } else {
                fetch(`http://127.0.0.1:8000/api1/profiles/${this.props.username}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${this.state.token}`
                    }
                }).then(response => response.json())
                    .then(res => {
                        this.setState({followList: res.user.followings})
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <div>{this.state.followList.map(followering => {
                            return (
                                <React.Fragment>
                                    {this.state.follower ?
                                        <div key={followering.username} className="blue ">
                                            <Link to={`/profile/${followering.username}`}>
                                                <button className=" ui button  huge contain4Style">
                                                    <i className="users icon float-left"/>
                                                    <span>{followering.username}</span>
                                                </button>
                                            </Link>
                                            {(this.state.username === this.props.username) ?
                                                (<span>
                                                    <i className="blue icon big trash alternate"
                                                       onClick={() => this.removeClicked(followering.username)}/>
                                                     <i className="red icon big ban"
                                                        onClick={() => this.blockClicked(followering.username)}/>
                                                </span>) :
                                                <span/>}
                                            <br/>
                                            <br/>
                                        </div>
                                        :
                                        <div key={followering} className="blue ">
                                            <Link to={`/profile/${followering}`}>
                                                <button className=" ui button  huge contain4Style">
                                                    <i className="users icon float-left"/>
                                                    <span>{followering}</span>
                                                </button>
                                            </Link>
                                            <br/>
                                            <br/>
                                        </div>}

                                </React.Fragment>)
                        })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(FollowList)

