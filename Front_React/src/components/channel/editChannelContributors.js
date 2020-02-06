import React, {Component} from "react";
import {Link} from "react-router-dom";
import './channel.css'
import {withCookies} from "react-cookie";


class EditChannelContributors extends Component {

    state = {
        channel: this.props.channel,
        contributor: '',
        token: this.props.cookies.get('myToken'),
        removeThisGuy: '',
    };

    newContributorAdded = event => {
        let contrib = event.target.value;
        this.setState({contributor: contrib});
    };

    addClicked = ev => {
        let channel = this.state.channel;
        channel['addToContributors'] = this.state.contributor;
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
                this.setState({channel: resp})
                console.log(channel)
            })
            .catch(error => console.log(error))
    };

    deleteClicked = thisGuy => {
        let channel = this.state.channel;
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
            .catch(error => console.log(error))
    };

    render() {
        return (
            <React.Fragment>
                <form className="ui form">
                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>Add New Contributor</label>
                                <input type="text" name="newContributor" placeholder="new Contributor"
                                       onChange={this.newContributorAdded}/>
                            </div>
                            <i className=" icon big plus contain2Style" onClick={this.addClicked}/>
                        </div>
                    </div>
                </form>
                <div>{this.state.channel.contributors.map(contributor => {
                    return (
                        <div key={contributor.id} className="blue ">
                            <Link to={`/profile/${contributor.username}`}>
                                <button className=" ui button  big contain3Style">
                                    <span>{contributor.username}</span>
                                </button>
                            </Link>
                            <i className="red icon big trash alternate"
                               onClick={() => this.deleteClicked(contributor.username)}/>
                            <br/>
                            <br/>
                        </div>
                    )
                })}
                </div>
            </React.Fragment>
        )
    }

}

export default withCookies(EditChannelContributors)
