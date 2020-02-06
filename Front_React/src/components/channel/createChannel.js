import React, {Component} from "react";
import {withCookies} from "react-cookie";
import EditProfilePic from "../Profile/editProfilePic";


const containStyle = {
    position: 'relative',
    top: '25px'
};


class CreateChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('myToken'),
            username: this.props.cookies.get('userName'),
            channel: {
                channelId: '',
                channelName: '',
                description: '',
                lastId: this.props.channelId
            }
        }
    }


    submitClicked = event => {
        console.log(this.state.token);
        if (!this.props.update) {
            fetch(`http://127.0.0.1:8000/api1/channel/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`
                },
                body: JSON.stringify(this.state.channel)
            }).then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    window.location.href = window.location.origin + '/channel';
                })
                .catch(error => console.log(error))
        } else {
            fetch(`http://127.0.0.1:8000/api1/channel/${this.props.channelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`
                },
                body: JSON.stringify(this.state.channel)
            }).then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    window.location.href = window.location.origin + '/channel';
                })
                .catch(error => console.log(error))
        }
    };

    changeTrigger = event => {
        let channelIn = this.state.channel;
        channelIn[event.target.name] = event.target.value;
        this.setState({channel: channelIn});
    };

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <EditProfilePic/>
                        <div className="ui form">
                            <div className="three fields">
                                <div className="field">
                                    <label>Channel name</label>
                                    <input type="text" placeholder="channel name" name="channelName"
                                           onChange={this.changeTrigger}/>
                                </div>
                                {!this.props.update ?
                                    <div className="field">
                                        <label>Channel Id</label>
                                        <input type="text" placeholder="channel Id" name="channelId"
                                               onChange={this.changeTrigger}/>
                                    </div> : <span></span>}

                            </div>
                        </div>
                        <div className="ui form">
                            <div className="field">
                                <label>Description</label>
                                <textarea rows="2" placeholder="description and rules" name="description"
                                          onChange={this.changeTrigger}/>
                            </div>
                        </div>

                        <button className="ui button" onClick={this.submitClicked} style={containStyle}>
                            {!this.props.update ?
                                <span>create channel</span> :
                                <span>update channel</span>
                            }
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(CreateChannel)
