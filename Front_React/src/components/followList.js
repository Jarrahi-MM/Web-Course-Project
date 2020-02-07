import React, {Component} from "react";
import {withCookies} from "react-cookie";
import {Link} from "react-router-dom";

class FollowList extends Component {

    state = {
        followList: ['negin', 'majsa'],
        token: this.props.cookies.get('myToken'),
        follower: this.props.follower,
    };

    removeClicked = thisGuy => {
        /* let channel = this.state.channel;
         channel['removeFromContributors'] = thisGuy;
         this.setState({channel: channel});
         fetch(`http://127.0.0.1:8000/api1/channel/${this.props.channelId}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Token ${this.state.token}`
             },
             body: JSON.stringify(this.state.channel)
         }).then(response => response.json())
             .then(resp => {
                 this.setState({channel: resp});
                 console.log(channel)
             })
             .catch(error => console.log(error))*/
    };

    componentDidMount() {
        if (this.state.token) {
            fetch(`http://127.0.0.1:8000/api1/channels/${this.props.username}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(response => response.json())
                .then(res => {
                    this.setState({followList: res.followers})
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <div>{this.state.followList.map(followering => {
                            return (
                                <div key={followering.id} className="blue ">
                                    <Link to={`/profile/${followering}`}>
                                        <button className=" ui button  big contain4Style">
                                            <i className="users icon float-left"/>
                                            <span>{followering}</span>
                                        </button>
                                    </Link>
                                    <i className="red icon big trash alternate"
                                       onClick={() => this.removeClicked(followering)}/>
                                    <br/>
                                    <br/>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(FollowList)

