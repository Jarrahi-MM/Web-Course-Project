import React, {Component} from "react";
import EditChannelContributors from "./editChannelContributors";
import EditChannelInfo from "./editChannelInfo";


class EditChannel extends Component {

    state = {
        isContributors: true
    };

    contribClicked = () => {
        this.setState({isContributors: true})
    };

    infoClicked = () => {
        this.setState({isContributors: false})
    };

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
                        <EditChannelContributors/>
                        : <EditChannelInfo channelId={this.props.channelId}/>}
                </div>
            </React.Fragment>
        )
    }

}

export default EditChannel
