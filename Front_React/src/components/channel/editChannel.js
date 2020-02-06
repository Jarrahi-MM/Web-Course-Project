import React, {Component} from "react";
import EditChannelContributors from "./editChannelContributors";
import EditChannelInfo from "./editChannelInfo";
import {withCookies} from "react-cookie";


class EditChannel extends Component {

    state = {
        isContributors: false,
        channel: [],
        token: this.props.cookies.get('myToken'),
    };

    contribClicked = () => {
        this.setState({isContributors: true})
    };

    infoClicked = () => {
        this.setState({isContributors: false})
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api1/channel/${this.props.channelId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(response => response.json())
            .then(res => {
                this.setState({channel: res});
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui blue two item inverted menu large">
                    <a className="item" onClick={this.infoClicked}>
                        Channel Information
                    </a>
                    <a className="item" onClick={this.contribClicked}>
                        Contributors
                    </a>
                </div>
                <div>
                    {this.state.isContributors ?
                        <EditChannelContributors channelId={this.props.channelId}
                                                 channel={this.state.channel}/>
                        : <EditChannelInfo channelId={this.props.channelId}/>}
                </div>
            </React.Fragment>
        )
    }

}

export default withCookies(EditChannel)
