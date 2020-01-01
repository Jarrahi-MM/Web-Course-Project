import React, {Component} from 'react'
import {Dropdown, DropdownDivider, DropdownItem, DropdownSearchInput} from 'semantic-ui-react'

const channels = [
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
];

class ChannelDD extends Component{
    onChannelClick = (id) => {
        //push that channel url and change selected channel
    };

    render() {
        return (
            <Dropdown
                {...channels[0]}
                labeled
                button
                className='icon'
                scrolling
            >
                <Dropdown.Menu>
                    <DropdownItem icon={'home'} text={'Home'} onClick={this.onChannelClick.bind(this,'home')}/>
                    <DropdownDivider/>
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