import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withCookies} from "react-cookie";

class Channel extends Component {

    state = {
        showList: false,
        channels: []
    };

    toggle = () => {
        this.setState({showList: !this.state.showList})
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/channels/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({userInfo: res})
            })
            .catch(error => console.log(error))

        if (this.state.username === this.props.username)
            this.setState({myAccount: true});
        else
            this.setState({myAccount: false})
    }

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <Link to={'/creatChannel'} className="ui right labeled icon button">
                            ADD NEW CHANNEL
                            <i className="right arrow icon"></i>
                        </Link><br/><br/>
                        <div onClick={this.toggle} className="ui right labeled icon button">
                            SHOW MY CHANNELS
                            <i className="right arrow icon"></i>
                        </div>
                        {this.state.showList ?
                            <div>{this.state.channels.map(channel => {
                                return (
                                    <div key={channel.id}>
                                        <h3>
                                            {channel.channelName}
                                        </h3>
                                    </div>
                                )
                            })}
                            </div>
                            : <span></span>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(Channel)
