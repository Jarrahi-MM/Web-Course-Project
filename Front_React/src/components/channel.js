import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withCookies} from "react-cookie";

class Channel extends Component {

    state = {
        showList: false,
        channels: [],
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        profile: []
    };

    toggle = () => {
        this.setState({showList: !this.state.showList})
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/profiles/${this.state.username}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({profile: res});
            })
            .catch(error => console.log(error));

        fetch(`http://127.0.0.1:8000/api1/channels/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({channels: res})
            }).then(res => {
            const channels = this.state.channels.filter(channel => channel.owner === this.state.profile.user.id);
            this.setState({channels: channels})
        }).catch(error => console.log(error))

    }

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <Link to={'/creatChannel'} className="ui right labeled icon button">
                            ADD NEW CHANNEL
                            <i className="right arrow icon"/>
                        </Link><br/><br/>
                        <div onClick={this.toggle} className="ui right labeled icon button">
                            SHOW MY CHANNELS
                            <i className="right arrow icon"/>
                        </div>
                        <br/>
                        <br/>
                        {this.state.showList ?
                            <div>{this.state.channels.map(channel => {
                                return (
                                    <div key={channel.id} className="blue">
                                        <button className="fluid ui button blue big">
                                            <span>{channel.channelName}</span>
                                        </button>
                                        <br/>
                                    </div>
                                )
                            })}
                            </div>
                            : <span/>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(Channel)
