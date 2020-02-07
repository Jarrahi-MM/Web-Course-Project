import React, {Component} from 'react';
import svg404 from '../static/404.svg'

class NotFound extends Component {
    render() {
        return (
            <div className={'d-flex mt-3 justify-content-center'}>
                <img src={svg404} alt="Not found" className={'align-self-center'}/>
            </div>
        );
    }
}

export default NotFound;