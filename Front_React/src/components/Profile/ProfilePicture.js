import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'

const containStyle = {
    objectFit: 'cover',
    display: 'inline-block'
};

const imageStyle = {
    width: '250px',
    height: '250px',
    display: 'inline-block',
    right:'20px'
};

class ProfilePicture extends Component {
    render() {
        return (<div style={containStyle}>
            <Image style={imageStyle} src={this.props.image} size='medium' circular/>
        </div>);
    }
}

export default ProfilePicture
