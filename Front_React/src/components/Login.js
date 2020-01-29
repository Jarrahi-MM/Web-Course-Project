import React, {Component} from "react";
import {withCookies} from "react-cookie";

class Login extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            credentials: {'username': '', 'password': ''}
        }
    }
    
    onType = event => {
        let credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;
        this.setState({credentials: credentials});
    };

    submit = () => {
        fetch(`http://127.0.0.1:8000/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.credentials)
        }).then(response => response.json())
            .then(response => {
                this.props.cookies.set('myCookie', response.token);
            })
            .catch(error => {
            });
    };

    render() {
        return (
            <div>
                <label>
                    Username:
                    <input type='text' name='username' onChange={this.onType}/>
                </label>
                <label>
                    Password:
                    <input type='password' name='password' onChange={this.onType}/>
                </label>
                <button onClick={this.submit}>login</button>
            </div>
        )
    }

}

export default withCookies(Login);