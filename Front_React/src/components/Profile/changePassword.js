import React, {Component} from "react";
import {withCookies} from "react-cookie";

class ChangePassword extends Component {


    state = {
        token: this.props.cookies.get('myToken'),
        username: this.props.cookies.get('userName'),
        password: {
            newPass: null,
        },
    };


    changed = event => {
        console.log("shitts")
        let password = this.state.password;
        password[event.target.name] = event.target.value;
        this.setState({password: password});
    };

    passwordChangeClicked = ev => {
        console.log("shit")
        console.log("shit")
        fetch(`http://127.0.0.1:8000/api1/pass/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`
            },
            body: JSON.stringify(this.state.password)
        }).then(response => response.json())
            .catch(error => console.log(error))

    };


    render() {
        return (
            <React.Fragment>
                <form className="ui form">
                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>new password again</label>
                                <input type="text" name="newPass" placeholder="Enter new password again"
                                       onChange={this.changed}/>
                            </div>
                        </div>
                    </div>
                </form>
                <button className="ui button" onClick={ this.passwordChangeClicked}>
                    change password
                </button>

            </React.Fragment>
        )
    }
}

export default withCookies(ChangePassword)
