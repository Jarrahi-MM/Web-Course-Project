import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'

const containStyle = {
    objectFit: 'cover'
};

const imageStyle = {
    width: '250px',
    height: '250px'
};

class ImageExampleCircular extends Component {
    render() {
        return (<div style={containStyle}>
            <Image style={imageStyle} src={this.props.image} size='medium' circular/>
        </div>);
    }
}

export default ImageExampleCircular
