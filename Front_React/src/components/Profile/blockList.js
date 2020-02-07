import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withCookies} from "react-cookie";

class BlockList extends Component {

    state = {
        blockList: [],
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/channel/${this.props.username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({blockList: res.blockedUsers})
            })
            .catch(error => console.log(error))
    }

    unblockClicked = thisGuy => {
        let channel = {unblock: ''};
        channel['unblock'] = thisGuy;
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


    render() {
        return (
            <React.Fragment>
                <div className="contain2Style">
                    <div className="ui piled raised very padded container segment">
                        <div>{this.state.blockList.map(blockedUser => {
                            return (
                                <React.Fragment>
                                    <div key={blockedUser.username} className="blue ">
                                        <Link to={`/profile/${blockedUser.username}`}>
                                            <button className=" ui button  huge contain4Style">
                                                <i className="users icon float-left"/>
                                                <span>{blockedUser.username}</span>
                                            </button>
                                        </Link>
                                        <span>
                                            <i className="green icon big unlock alternate"
                                               onClick={() => this.unblockClicked(blockedUser.username)}/>
                                        </span>
                                        <br/>
                                        <br/>
                                    </div>
                                </React.Fragment>)
                        })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(BlockList)
