import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'

const channels = [
    {
        text: 'Home',
        id: '1',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
    {
        text: 'Sports',
        id: '2',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
    {
        text: 'Jokes',
        id: '3',
        image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
    },
]

class ChannelDD extends Component{
    onChannelClick = (id) => {
        //todo
    };

    render() {
        return (
            <Dropdown
                labeled
                button
                className='icon'
                {...channels[0]}
            >
                <Dropdown.Menu>
                    <Dropdown.Header content='Followed channels'/>
                    {channels.map((option) => (
                        <Dropdown.Item key={option.id} {...option} onClick={this.onChannelClick.bind(this,option.id)}/>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default ChannelDD
