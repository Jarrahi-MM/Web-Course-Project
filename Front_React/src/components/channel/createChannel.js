import React, {Component} from "react";
import {withCookies} from "react-cookie";
import {Link} from "react-router-dom";

class CreateChannel extends Component {

    state = {
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
    };


    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">

                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default withCookies(CreateChannel)
