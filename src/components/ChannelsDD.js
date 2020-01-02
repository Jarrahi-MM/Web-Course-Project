import React, {Component} from 'react'
import {Dropdown, DropdownDivider, DropdownItem} from 'semantic-ui-react'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {loadChannels} from "../redux/action_creators/navbarActions";

class ChannelDD extends Component {
    onChannelClick = (name) => {
        this.props.history.push('/c/' + name)
    };

    onHomeClick = () => {
        this.props.history.push('/')
    };

    componentDidMount() {
        this.props.loadChannels()
    }

    render() {
        return (
            <Dropdown
                text={this.props.inChannel}
                labeled
                button={!this.props.compact}
                className='icon'
                scrolling
            >
                <Dropdown.Menu>
                    <DropdownItem icon={'home'} text={'Home'} onClick={this.onHomeClick}/>
                    <DropdownDivider/>
                    <Dropdown.Header content='Followed channels'/>
                    {this.props.channels.map((option) => (
                        <Dropdown.Item key={option.name} image={option.image} text={option.name}
                                       onClick={this.onChannelClick.bind(this, option.name)}/>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    channels: state.navbar.channels,
    inChannel: state.navbar.inChannel
});

export default withRouter(connect(mapStateToProps,{loadChannels})(ChannelDD))